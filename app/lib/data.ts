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
            },
            orderBy: {
                createdAt: 'desc'
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
                    slug: true,
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
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        } else {
            filteredChallenges = await prisma.challenge.findMany({
                skip: offset,
                take: 10,
                select: {
                    id: true,
                    title: true,
                    slug: true,
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
                },
                orderBy: {
                    createdAt: 'desc'
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

export async function fetchChallengeBySlug(slug: string) {
    noStore()
    try {
        const challenge = await prisma.challenge.findFirst({
            where: {
                slug: slug
            },
            select: {
                id: true,
                title: true,
                content: true,
                description: true,
                level: true,
                tags: {
                    select: {
                        tag: {
                            select: {
                                title: true
                            }
                        }
                    }
                }
            }
        })
        return challenge
    } catch (error) {
        console.error('Database error', error)
        throw new Error('Failed to fetch challenge data.')
    }
}

export async function fetchChallengesByAuthor(authorId: string) {
    noStore()

    try {
        const challenges = await prisma.challenge.findMany({
            where: {
                challengeManager: {
                    id: {
                        equals: authorId
                    }
                }
            },
            select: {
                id: true,
                title: true,
                slug: true,
                archived: true,
                published: true,
                createdAt: true,
                _count: {
                    select: { solutions: true }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return challenges
    } catch (error) {
        console.error('Database Error', error)
        throw new Error('Failed to fetch filtered challenges.')
    }
}

export async function fetchChallengeById(challengeId: string) {
    noStore()

    try {
        const challenge = await prisma.challenge.findUnique({
            where: {
                id: challengeId
            },
            select: {
                id: true,
                title: true,
                description: true,
                level: true,
                content: true,
                tags: {
                    select: {
                        tagId: true
                    }
                }
            }
        })
        return challenge
    } catch (error) {
        console.error('Database Error', error)
        throw new Error('Failed to fetch challenge.')
    }
}

export async function fetchTags() {
    noStore()

    try {
        const tags = await prisma.tag.findMany({
            select: {
                id: true,
                title: true,
            }
        })
        return tags
    } catch (error) {
        console.error('Database Error', error)
        throw new Error('Failed to fetch tags.')
    }
}

export async function countChallengeSolutions(challengeId: string) {
    noStore()

    try {
        const count = await prisma.solution.count({
            where: {
                challenge: {
                    id: challengeId
                }
            },
            select: {
                _all: true
            }
        })

        return count._all
    } catch (error) {
        console.error('Database Error', error)
        throw new Error('Failed to count solutions.')
    }
}

export async function fetchSolutionsByAuthorId(authorId: string) {
    noStore()

    try {
        const solutions = await prisma.solution.findMany({
            where: {
                user: {
                    id: authorId
                }
            },
            select: {
                id: true,
                repoUrl: true,
                createdAt: true,
                challenge: {
                    select: {
                        slug: true,
                        title: true
                    }
                }
            }
        })
        return solutions
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch Solutions by his Author.')
    }
}

/* Projects */

export async function fetchProjectsWithTags() {
    noStore()
    try {
        const projects = await prisma.project.findMany({
            select: {
                id: true,
                title: true,
                solved: true,
                issueUrl: true,
                solutionUrl: true,
                resolvedBy: true,
                resolverImage: true,
                description: true,
                user: {
                    select: {
                        name: true,
                        image: true,
                    }
                },
                tags: {
                    select: {
                        tag: {
                            select: {
                                title: true,
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return projects
    } catch (error) {
        console.error('Database error:', error)
        throw new Error('Failed to fetched projects data.')
    }
}

export async function fetchProjectsTags() {
    noStore()
    try {
        const tags = await prisma.tag.findMany({
            include: {
                _count: {
                    select: { projects: true }
                }
            }
        })
        return tags
    } catch (error) {
        console.error('Database error', error)
        throw new Error('Failed to fetch projects tags data.')
    }
}

export async function countProjects() {
    noStore()
    try {
        const totalItems = await prisma.project.count({})
        return totalItems
    } catch (error) {
        console.error('Database error', error)
        throw new Error('Failed to count projects data.')
    }
}