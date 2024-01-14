import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { fetchChallengesByAuthor } from "@/app/lib/data";
import { challengeWithCountedSolution } from "@/app/lib/definitions";
import { ChallengeTable } from "@/app/ui/Table";

export default async function MyChallengesPage() {
    const session = await getServerAuthSession()
    let challengesData: challengeWithCountedSolution | [] = []

    if (session) {
        const challenges = await fetchChallengesByAuthor(session.user.id)
        challengesData = challenges
    }

    return (
        <div className="my-challenges">
            <ChallengeTable
                className="my-challenges__table"
                dataChallenges={challengesData}
            />
        </div>
    )
}