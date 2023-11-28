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