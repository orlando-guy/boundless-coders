import { fetchChallengeById, fetchTags } from "@/app/lib/data";
import EditChallengeForm from "@/app/ui/challenges/edit-form";
import { notFound } from "next/navigation";

export default async function EditPage({
    params
}: Readonly<{
    params: { id: string }
}>) {
    const [tags, challenge] = await Promise.all([
        fetchTags(),
        fetchChallengeById(params.id)
    ])

    if (!challenge) {
        notFound()
    }

    return (
        <div className="my-challenges">
            <EditChallengeForm tags={tags} challenge={challenge} />
        </div>
    )
}