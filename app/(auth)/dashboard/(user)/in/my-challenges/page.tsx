import { redirect } from "next/navigation";
import { ChallengeTable } from "@/app/ui/Table";
import { challengeWithCountedSolution } from "@/app/lib/definitions";
import { fetchChallengesByAuthor } from "@/app/lib/data";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";

export default async function MyChallengesPage() {
    const session = await getServerAuthSession()
    const admissible = ['ADMIN', 'CHALLENGE_MANAGER']

    if (session && !admissible.includes(session.user.role)) {
        redirect('/dashboard/in')
    }

    let challengesData: challengeWithCountedSolution | [] = []

    if (session) {
        const challenges = await fetchChallengesByAuthor(session.user.id)
        challengesData = challenges
    }

    return (
        <div className="my-challenges dashboard-responsive">
            <ChallengeTable
                className="my-challenges__table"
                dataChallenges={challengesData}
            />
        </div>
    )
}