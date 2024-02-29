import { unstable_noStore as noStore } from 'next/cache'
import prisma from '@/app/lib/db'
import { ChallengesWithTags, ProjectWithTags } from '@/app/lib/definitions';

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

/**
 * It fetch information about projects associated with a specific user, including their details and contributors.
 * 
 * @param {string} authorId represents the ID of the Author
 * @param {number} currentPage
 * @param {number | undefined} quantity represents the number of elements to recover, it's by default 10
 * 
 */
export async function fetchPaginatedProjectsByAuthorId(authorId: string, currentPage: number, quantity?: number) {
    noStore()
    quantity ||= 10
    const offset = 10 * (currentPage - 1)

    try {
        const projectTotal = await prisma.project.count({
            where: {
                user: {
                    id: authorId
                }
            }
        })
        const projects = await prisma.project.findMany({
            skip: offset,
            take: quantity,
            where: {
                userId: authorId
            },
            select: {
                id: true,
                title: true,
                solved: true,
                issueUrl: true,
                solutionUrl: true,
                resolvedBy: true,
                resolverImage: true,
                description: true,
                createdAt: true,
                contributions: {
                    select: {
                        contributor: {
                            select: {
                                id: true,
                                name: true,
                                image: true
                            }
                        }
                    }
                }
            }
        })
        return { projectTotal, projects }
    } catch (error) {
        console.error('Database error:', error)
        throw new Error('Failed to fetched projects data.')
    }
}

export async function filterProjectByTagAndPage(currentPage: number, tagTitle: string, quantity?: number) {
    noStore()
    quantity ||= 10
    const offset = quantity * (currentPage - 1)
    let projects: ProjectWithTags[]

    try {
        if (tagTitle !== '') {
            projects = await prisma.project.findMany({
                skip: offset,
                take: quantity,
                where: {
                    tags: {
                        some: {
                            tag: {
                                title: tagTitle
                            }
                        }
                    }
                },
                select: {
                    id: true,
                    title: true,
                    solved: true,
                    issueUrl: true,
                    solutionUrl: true,
                    resolvedBy: true,
                    resolverImage: true,
                    description: true,
                    createdAt: true,
                    user: {
                        select: {
                            name: true,
                            image: true,
                        }
                    },
                    contributions: {
                        select: {
                            contributorId: true
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
        } else {
            projects = await prisma.project.findMany({
                skip: offset,
                take: quantity,
                select: {
                    id: true,
                    title: true,
                    solved: true,
                    issueUrl: true,
                    solutionUrl: true,
                    resolvedBy: true,
                    resolverImage: true,
                    description: true,
                    createdAt: true,
                    user: {
                        select: {
                            name: true,
                            image: true,
                        }
                    },
                    contributions: {
                        select: {
                            contributorId: true
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
        }
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

/**
 * Counts and returns the number of projects stored. It can also count projects following a specific tag
 */
export async function countProjects(tagTitle?: string) {
    noStore()
    try {

        if (tagTitle) {
            return await prisma.project.count({
                where: {
                    tags: {
                        some: {
                            tag: {
                                title: tagTitle
                            }
                        }
                    }
                }
            })
        }

        return await prisma.project.count({})
    } catch (error) {
        console.error('Database error', error)
        throw new Error('Failed to count projects data.')
    }
}

export async function fetchProjectById(projectId: string) {
    noStore()
    try {
        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            },
            select: {
                id: true,
                title: true,
                solved: true,
                issueUrl: true,
                solutionUrl: true,
                resolvedBy: true,
                resolverImage: true,
                description: true,
                createdAt: true,
            }
        })
        return project
    } catch (error) {
        console.error('Database error', error)
        throw new Error("Failed to fetch project data.")
    }
}

export async function fetchContributorsByProjectId(projectId: string) {
    noStore()

    try {
        const contributors = await prisma.contribution.findMany({
            where: {
                project: {
                    id: projectId
                },
            },
            select: {
                contributor: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            }
        })
        return contributors
    } catch (error) {
        console.error('Database error', error)
        throw new Error("Failed to fetch contributor data.")
    }
}

export async function fetchAchievedProjectsByContributorId(contributorId: string) {
    noStore()

    try {
        const contributor = await prisma.user.findUnique({
            where: {
                id: contributorId
            },
            select: {
                name: true
            }
        })

        if (contributor && contributor.name) {
            return await prisma.project.findMany({
                where: {
                    contributions: {
                        every: {
                            contributor: {
                                id: contributorId
                            }
                        }
                    },
                    solved: {
                        equals: true
                    },
                    resolvedBy: contributor.name
                },
                select: {
                    id: true,
                    title: true,
                    issueUrl: true,
                    solutionUrl: true
                }
            })
        }
        return null
    } catch(error) {
        console.log(error)
        throw new Error("Failed to fetch User Contribution data.")
    }
}