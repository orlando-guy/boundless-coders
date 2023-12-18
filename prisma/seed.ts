import { $Enums, Prisma } from '@prisma/client';
import prisma from '../app/lib/db';
import { faker } from '@faker-js/faker';

const TAGS = [
    "HTML5",
    "CSS",
    "JavaScript",
    "Node.js",
    "PHP",
    "GO",
    "unix",
    "développement frontend",
    "développement web",
    "développement backend"
]

const generateRole = () => {
    const UserRoles = ["USER", "CHALLENGE_MANAGER", "ADMIN"]
    return faker.helpers.arrayElement(UserRoles) as $Enums.Role /* "USER" | "CHALLENGE_MANAGER" | "ADMIN" */
}

const generateLevel = () => {
    const Level = ["ENTRY", "MIDDLE", "ADVANCED"]
    return faker.helpers.arrayElement(Level) as $Enums.Level /* "ENTRY" | "MIDDLE" | "ADVANCED" */
}

async function seedDatabase() {
    try {
        // Seed Users
        // const users = await prisma.user.createMany({
        //     data: Array.from({ length: 10 }, () => ({
        //         username: faker.internet.userName(),
        //         email: faker.internet.email(),
        //         password: faker.internet.password(),
        //         githubId: faker.number.int({ min: 0, max: 1000 }),
        //         role: generateRole()
        //     }))
        // });
        // users.count !== 0 && console.log("[SEED] Successfully create user records")

        // Get different types of user
        const allUsers = await prisma.user.findMany()
        const admin = await prisma.user.findFirst({
            select: {
                id: true,
            },
            where: { role: 'ADMIN' },
        })
        const challengeManager = await prisma.user.findMany({
            select: {
                id: true
            },
            where: { role: 'CHALLENGE_MANAGER' }
        })

        if (admin && allUsers.length > 0) {
            // Seed Tags
            // const tags = await prisma.tag.createMany({
            //     data: Array.from(TAGS, (tag) => ({
            //         title: tag,
            //         adminId: admin.id,
            //         archived: faker.datatype.boolean()
            //     })),
            //     skipDuplicates: true
            // })
            // tags.count > 0 && console.log('[SEED] Successfully create tag records.')

            const availableTags = await prisma.tag.findMany({
                select: { id: true }
            })

            if (challengeManager.length > 0 && availableTags.length > 0) {
                // Seed Challenge
                const challengesId: string[] = []
                const challengeData: Prisma.ChallengeCreateInput[] = Array
                    .from({ length: 1 }, () => ({
                        title: faker.lorem.words(10),
                        slug: faker.lorem.slug(),
                        description: faker.lorem.words(30),
                        content: faker.lorem.paragraphs(6),
                        level: generateLevel(),
                        archived: faker.datatype.boolean(),
                        published: faker.datatype.boolean(),
                        challengeManager: {
                            connect: {
                                id: challengeManager[faker.number.int({ min: 0, max: challengeManager.length - 1 })].id,
                            }
                        },
                        tags: {
                            create: [
                                {
                                    assignedAt: new Date(),
                                    tag: {
                                        connect: {
                                            id: availableTags[faker.number.int({ min: 0, max: availableTags.length - 1 })].id,
                                        }
                                    }
                                },
                                {
                                    assignedAt: new Date(),
                                    tag: {
                                        connect: {
                                            id: availableTags[faker.number.int({ min: 0, max: availableTags.length - 1 })].id,
                                        }
                                    }
                                }
                            ]
                        }
                    }))

                for (const c of challengeData) {
                    const challenge = await prisma.challenge.create({
                        data: c
                    })
                    challengesId.push(challenge.id)
                    console.log('[SEED] created challenge with id:', challenge.id)
                }

                // Seed Solution
                if (challengesId.length > 0) {
                    const solutions = await prisma.solution.createMany({
                        data: Array.from(
                            { length: faker.number.int({ min: 0, max: 15 }) },
                            () => ({
                                repoUrl: faker.internet.url(),
                                challengeId: challengesId[faker.number.int({ min: 0, max: challengesId.length - 1 })]
                            }))
                    })
                    solutions.count > 0 && console.log('[SEED] Successfully create solution records.')
                }
            }
            // if (availableTags.length > 0) {
            //     // Seed Project
            //     const projectData: Prisma.ProjectCreateInput[] = Array.from({ length: 10 }, () => ({
            //         title: faker.lorem.words(20),
            //         repoUrl: faker.internet.url(),
            //         description: faker.lorem.paragraphs(3),
            //         user: {
            //             connect: {
            //                 id: allUsers[faker.number.int({ min: 0, max: allUsers.length - 1 })].id,
            //             }
            //         },
            //         tags: {
            //             create: [
            //                 {
            //                     assignedAt: new Date(),
            //                     tag: {
            //                         connect: {
            //                             id: availableTags[faker.number.int({ min: 0, max: availableTags.length - 1 })].id,
            //                         }
            //                     }
            //                 },
            //                 {
            //                     assignedAt: new Date(),
            //                     tag: {
            //                         connect: {
            //                             id: availableTags[faker.number.int({ min: 0, max: availableTags.length - 1 })].id,
            //                         }
            //                     }
            //                 }
            //             ]
            //         }
            //     }))

            //     for (const p of projectData) {
            //         const project = await prisma.project.create({
            //             data: p
            //         })
            //         console.log('[SEED] created project with id:', project.id)
            //     }
            // }
        }
    } catch (error) {
        console.error('Error from seeding:', error)
    } finally {
        await prisma.$disconnect()
    }
}

seedDatabase()