import React from "react"
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route"
import { fetchProjectByAuthorId } from "@/app/lib/data"
import { MyProjectsTable } from "@/app/ui/Table"

export default async function MyContributionPage() {
    const session = await getServerAuthSession()
    let projects

    if (session) {
        projects = await fetchProjectByAuthorId(session.user.id)
    }

    return (
        <div className="dashboard-responsive">
            <h1>Mes projets</h1>
            <MyProjectsTable
                projects={projects}
                containerClassName="mt-4"
            />
        </div>
    )
}
