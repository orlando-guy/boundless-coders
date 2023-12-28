import { ChallengeTable } from "@/app/ui/Table";
import TrendChallengeWidget from "@/app/ui/challenges/trend-challenge-widget";

export default function ChallengeManagerPage() {
    return (
        <>
            <h1>Tableau de bord</h1>
            <br />
            <TrendChallengeWidget />

            <ChallengeTable />
        </>

    )
}