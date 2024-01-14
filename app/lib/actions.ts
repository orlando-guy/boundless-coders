'use server'

import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route"
import { z } from 'zod'
import prisma from '@/app/lib/db'

const FormSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    content: z.string(),
    level: z.enum(['ENTRY', 'MIDDLE', 'ADVANCED']),
    tags: z.array(z.string())
})

const CreateChallenge = FormSchema.omit({ id: true })

export async function createChallenge(formData: FormData) {
    const session = await getServerAuthSession()
    const challengeManagerId = session?.user.id

    
    const { title, description, content, level, tags } = CreateChallenge.parse({
        title: formData.get('title'),
        description: formData.get('description'),
        content: formData.get('content'),
        level: formData.get('level'),
        tags: formData.getAll('tag')
    })
    
    const challenge = await prisma.challenge.create({
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

    if (challenge.id) {
        revalidatePath('/dashboard/in/my-challenges')
        redirect('/dashboard/in/my-challenges')
    }
}