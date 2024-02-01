import { Endpoints } from "@octokit/types";
import { $Enums } from "@prisma/client";

export type TableHeaders = {
    key: string;
    header: string
}

export type listUserReposResponse = Endpoints["GET /orgs/{org}/repos"]["response"];

export type TableRows = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    issueCount: string;
    stars: string;
    links: string;
}

export type ChallengesWithTags = {
    id: string;
    title: string;
    slug: string;
    archived: boolean;
    description: string;
    tags: {
        tag: {
            title: string;
        }
    }[];
}[]

export type tagsWithChallengesCount = ({
    _count: {
        challenges: number;
    };
} & {
    id: string;
    title: string;
    adminId: string;
    archived: boolean;
    createdAt: Date;
    updatedAt: Date;
})[]

export type challengeWithCountedSolution = {
    id: string;
    title: string;
    slug: string;
    archived: boolean;
    published: boolean;
    createdAt: Date;
    _count: {
        solutions: number;
    };
}[]

export type TagField = {
    id: string;
    title: string;
}

export type ChallengeFields = {
    id: string;
    title: string;
    description: string;
    content: string;
    level: $Enums.Level;
    tags: {
        tagId: string;
    }[];
}

export type Solution = {
    id: string;
    repoUrl: string;
    createdAt: Date;
    challenge: {
        title: string;
        slug: string;
    };
}

/* Types related to Projects Or Contributions */

export type ProjectWithTags = {
    id: string;
    title: string;
    issueUrl: string;
    description: string;
    solved: boolean;
    resolvedBy: string | null;
    resolverImage: string | null;
    solutionUrl: string | null;
    user: {
        name: string | null;
        image: string | null;
    };
    tags: {
        tag: {
            title: string;
        }
    }[];
}

export type TagUsedByProjects = ({
    _count: {
        projects: number;
    };
} & {
    id: string;
    title: string;
    adminId: string;
    archived: boolean;
    createdAt: Date;
    updatedAt: Date;
})