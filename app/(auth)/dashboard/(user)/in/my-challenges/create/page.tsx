import { fetchTags } from "@/app/lib/data";
import CreateChallengeForm from "@/app/ui/challenges/create-form";

export default async function CreateChallengePage() {
    const tags = await fetchTags()
    return (
        <div className="dashboard-responsive">
            <CreateChallengeForm tags={tags} />
        </div>
    )
}