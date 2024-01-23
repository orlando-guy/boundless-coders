'use server'

import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route"
import { z } from 'zod'
import prisma from '@/app/lib/db'

export type PrevState = {
    errors?: {
        title?: string[];
        description?: string[];
        content?: string[];
        level?: string[];
        tags?: string[];
    };
    message?: string | null
}

export type SolutionPrevState = {
    errors?: {
        repoUrl?: string[];
    };
    success?: boolean | null;
    message?: string | null;
}

const ChallengeFormSchema = z.object({
    id: z.string(),
    title: z.string().min(20, {
        message: 'Veuillez remplir le champ titre, ce dernier doit avoir au minimum 05 mots'
    }),
    description: z.string().min(30, {
        message: 'Veuillez remplir le champ description, ce dernier doit avoir au minimum 20 mots',
    }),
    content: z.string().min(255, {
        message: 'Veuillez remplir le champ contenu ce dernier doit avoir au minimum 150 mots'
    }),
    level: z.enum(['ENTRY', 'MIDDLE', 'ADVANCED'], {
        invalid_type_error: 'Veiller sélectionner le niveau de difficulté de ce défi'
    }),
    tags: z.array(z.string()).min(1, {
        message: 'Veuillez sélectionner le(s) tag(s) correspondant à ce défi'
    }).max(3, {
        message: "Vous ne pouvez sélectionner qu'un maximum de 3 tags"
    })
})
const SolutionFormSchema = z.object({
    repoUrl: z.string().min(25, {
        message: "Désolé, l'URL que vous avez saisie est trop courte."
    }).max(255, {
        message: "Cette URL est trop longue. Veuillez saisir quelque chose de court."
    }).url('Veuillez saisir une URL valide.').includes('git', {
        message: "L'URL que vous avez saisie ne semble correspondre à aucun dépot GitHub ou GitLab"
    })
})

const CreateChallenge = ChallengeFormSchema.omit({ id: true })
const UpdateChallenge = ChallengeFormSchema.omit({ id: true, tags: true })

export async function createChallenge(
    prevState: PrevState,
    formData: FormData
) {
    const session = await getServerAuthSession()
    const challengeManagerId = session?.user.id

    // Validate form using zod
    const validatedFields = CreateChallenge.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        content: formData.get('content'),
        level: formData.get('level'),
        tags: formData.getAll('tag')
    })

    // If form validation fails, return errors early. Otherwise, continue
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Champs manquents. Échec de la création du défi'
        }
    }

    // prepare data for insertion into the database
    const { title, description, content, level, tags } = validatedFields.data

    // Insert data into database
    try {
        await prisma.challenge.create({
            data: {
                title,
                description,
                content,
                level,
                slug: title.toLocaleLowerCase().replaceAll(' ', '-'),
                challengeManager: {
                    connect: {
                        id: challengeManagerId
                    }
                },
                tags: {
                    createMany: {
                        data: Array.from(tags, (tag) => ({
                            tagId: tag
                        }))
                    }
                }
            }
        })
    } catch (error) {
        return {
            message: 'Database Error: Failed to create Challenge'
        }
    }

    // Revalidate the cache for my-challenges page and redirect the user.
    revalidatePath('/dashboard/in/my-challenges')
    redirect('/dashboard/in/my-challenges')
}

export async function updateChallenge(
    challengeId: string,
    prevState: PrevState,
    formData: FormData
) {
    const validatedFields = UpdateChallenge.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        content: formData.get('content'),
        level: formData.get('level'),
        tags: formData.getAll('tag')
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Érreur lors de la vérification des champs, Échec de la mise à jour du challenge'
        }
    }

    const { title, description, content, level } = validatedFields.data

    try {
        await prisma.challenge.update({
            where: {
                id: challengeId
            },
            data: {
                title,
                description,
                content,
                level,
                updatedAt: new Date()
            }
        })
    } catch (error) {
        return {
            message: 'Database Error: Failed to update Challenge.'
        }
    }

    revalidatePath('/dashboard/in/my-challenges')
    redirect('/dashboard/in/my-challenges')
}

export async function deleteChallenge(challengeId: string) {
    try {
        await prisma.challenge.delete({
            where: {
                id: challengeId
            }
        })
        revalidatePath('/dashboard/in/my-challenges')
    } catch (error) {
        return {
            message: 'Database Error: Failed to delete Challenge'
        }
    }
}

export async function archiveChallenge(challengeId: string) {
    try {
        await prisma.challenge.update({
            where: {
                id: challengeId
            },
            data: {
                archived: true,
                updatedAt: new Date()
            }
        })
        revalidatePath('/dashboard/in/my-challenges')
    } catch (error) {
        return {
            message: 'Database Error: Failed to archive Challenge'
        }
    }
}

export async function createChallengeSolution(
    challengeId: string,
    prevState: SolutionPrevState,
    formData: FormData
) {
    const session = await getServerAuthSession()
    const userId = session?.user.id

    const validatedFields = SolutionFormSchema.safeParse({
        repoUrl: formData.get('repoUrl')
    })

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Il semble que la vérification du champ de saisie ait échoué, ce qui a empêché l’enregistrement de la solution."
        }
    }

    const { repoUrl } = validatedFields.data

    try {
        const isSolutionExists = await prisma.solution.findFirst({
            where: {
                repoUrl
            },
            select: {
                id: true
            }
        })

        if (isSolutionExists) {
            return {
                success: false,
                message: "Il semble que cette solution ait déjà été proposée. Pourriez-vous soumettre une autre solution ?"
            }
        }

        await prisma.solution.create({
            data: {
                repoUrl,
                challenge: {
                    connect: {
                        id: challengeId
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
        revalidatePath('/challenges')

        return {
            success: true,
            message: 'La solution à bien été créer.'
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'Échec lors de la création de la solution.'
        }
    }
}

export async function deleteSolution(solutionId: string) {
    try {
        await prisma.solution.delete({
            where: {
                id: solutionId
            }
        })
        revalidatePath('/dashboard/in/contributions')
    } catch(error) {
        return {
            message: "Érreur de la bose de donnée: La Solution n'a pas pu être supprimer."
        }
    }
}