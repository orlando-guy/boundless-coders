import React from "react"
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route"
import { fetchPaginatedProjectsByAuthorId } from "@/app/lib/data"
import { MyProjectsTable } from "@/app/ui/Table"

export default async function MyContributionPage({
    searchParams
}: Readonly<{
    searchParams?: {
        page?: string;
    }
}> ) {
    const session = await getServerAuthSession()
    const curentPage = searchParams?.page ? Number(searchParams.page) : 1
    let projectData
    let totalItems = 0
    

    if (session) {
        const {projectTotal, projects} = await fetchPaginatedProjectsByAuthorId(session.user.id, curentPage)
        projectData = projects
        totalItems = projectTotal
    }

    return (
        <div className="dashboard-responsive">
            <h1>Mes projets</h1>
            <MyProjectsTable
                projects={projectData}
                containerClassName="mt-4"
                totalProjects={totalItems}
            />
        </div>
    )
}
