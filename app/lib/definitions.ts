import { Endpoints } from "@octokit/types";

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
    title: string;
    id: string;
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