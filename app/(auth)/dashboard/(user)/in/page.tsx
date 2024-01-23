import { filteredChallenges } from "@/app/lib/data";
import { ChallengeTable } from "@/app/ui/Table";
import TrendChallengeWidget from "@/app/ui/challenges/trend-challenge-widget";

export default async function ChallengeManagerPage() {
    const suggestedChallenges = await filteredChallenges(1, '')

    return (
        <div className="dashboard-responsive">
            <h1>Tableau de bord</h1>
            <br />
            <TrendChallengeWidget challenges={suggestedChallenges} />
        </div>
    )
}