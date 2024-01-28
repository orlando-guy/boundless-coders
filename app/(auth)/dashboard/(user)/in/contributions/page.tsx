import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route"
import { fetchSolutionsByAuthorId } from "@/app/lib/data"
import { MySolutionTable } from "@/app/ui/Table"

export default async function MyContributionPage() {
    const session = await getServerAuthSession()
    let solutions

    if (session) {
        solutions = await fetchSolutionsByAuthorId(session.user.id)
    }

    return (
        <div className="contribution dashboard-responsive">
            <h1>Mes contributions</h1>
            <MySolutionTable
                solutions={solutions}
                containerClassName="mt-4"
            />
        </div>
    )
}
