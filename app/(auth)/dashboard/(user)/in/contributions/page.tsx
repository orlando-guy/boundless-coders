import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route"
import { fetchAchievedProjectsByContributorId, fetchSolutionsByAuthorId } from "@/app/lib/data"
import { MySolutionTable, UserContributionsTable } from "@/app/ui/Table"

export default async function MyContributionPage() {
    const session = await getServerAuthSession()
    let solutions, contributions

    if (session) {
        solutions = await fetchSolutionsByAuthorId(session.user.id)
        contributions = await fetchAchievedProjectsByContributorId(session.user.id)
    }

    return (
        <div className="contribution dashboard-responsive">
            <h1>Mes contributions</h1>
            <MySolutionTable
                solutions={solutions}
                containerClassName="mt-4"
            />

            <UserContributionsTable
                contributions={contributions}
                containerClassName="mt-5"
            />
        </div>
    )
}
