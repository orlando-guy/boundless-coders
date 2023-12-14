import prisma from '@/app/lib/db'
import { unstable_noStore as noStore } from 'next/cache'
import { ChallengesWithTags } from './definitions';

export async function fetchChallengesWithTags() {
    noStore()
    try {
        const challenges = await prisma.challenge.findMany({
            select: {
                id: true,
                title: true,
                archived: true,
                tags: {
                    select: {
                        tag: {
                            select: {
                                title: true,
                            }
                        }
                    }
                }
            }
        })
        return challenges
    } catch (error) {
        console.error('Database error:', error)
        throw new Error('Failed to fetched challenges data.')
    }
}

export async function fetchChallengesTags() {
    noStore()
    try {
        const tags = await prisma.tag.findMany({
            include: {
                _count: {
                    select: { challenges: true }
                }
            }
        })
        return tags
    } catch (error) {
        console.error('Database error', error)
        throw new Error('Failed to fetch challenges tags data.')
    }
}

export async function filteredChallenges(currentPage: number, query: string) {
    noStore()
    const offset = 10 * (currentPage - 1)
    let filteredChallenges: ChallengesWithTags

    try {
        if (query !== '') {
            console.log(query)

            filteredChallenges = await prisma.challenge.findMany({
                skip: offset,
                take: 10,
                where: {
                    tags: {
                        some: {
                            tag: {
                                title: {
                                    contains: query,
                                },
                            },
                        },
                    },
                },
                select: {
                    id: true,
                    title: true,
                    archived: true,
                    description: true,
                    tags: {
                        select: {
                            tag: {
                                select: {
                                    title: true,
                                }
                            }
                        },
                        where: {
                            tag: {
                                title: query
                            }
                        }
                    }
                }
            })
        } else {
            filteredChallenges = await prisma.challenge.findMany({
                skip: offset,
                take: 10,
                select: {
                    id: true,
                    title: true,
                    archived: true,
                    description: true,
                    tags: {
                        select: {
                            tag: {
                                select: {
                                    title: true,
                                }
                            }
                        }
                    }
                }
            })
        }
        return filteredChallenges
    } catch (error) {
        console.error('Database Error', error)
        throw new Error('Failed to fetch filtered challenges.')
    }
}

export async function countChallenges() {
    noStore()
    try {
        const totalItems = await prisma.challenge.count({})
        return totalItems
    } catch (error) {
        console.error('Database error', error)
        throw new Error('Failed to count challenges data.')
    }
}