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

const FormSchema = z.object({
    id: z.string(),
    title: z.string().min(20, {
        message: 'Veiller remplir le champ titre, ce dernier doit avoir au minimum 05 mots'
    }),
    description: z.string().min(30, {
        message: 'Veiller remplir le champ description, ce dernier doit avoir au minimum 20 mots',
    }),
    content: z.string().min(255, {
        message: 'Veiller remplir le champ contenu ce dernier doit avoir au minimum 150 mots'
    }),
    level: z.enum(['ENTRY', 'MIDDLE', 'ADVANCED'], {
        invalid_type_error: 'Veiller sélectionner le niveau de difficulté de ce défi'
    }),
    tags: z.array(z.string()).min(1, {
        message: 'Veiller sélectionner le(s) tag(s) correspondant à ce défi'
    }).max(3, {
        message: "Vous ne pouvez sélectionner qu'un maximum de 3 tags"
    })
})

const CreateChallenge = FormSchema.omit({ id: true })
const UpdateChallenge = FormSchema.omit({ id: true, tags: true })

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
    console.log({ challengeId, formData, prevState })

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