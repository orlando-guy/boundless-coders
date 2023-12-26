import {
    filteredChallenges,
    fetchChallengesTags,
    countChallenges
} from "@/app/lib/data"
import ChallengeContentFrames from "@/app/ui/challenge-content-frames"

export default async function ChallengesPage({ searchParams }: Readonly<{
    searchParams?: {
        page?: string,
        topic?: string
    }
}>) {
    const tagsWithChallengesRelated = await fetchChallengesTags()
    const currentPage = Number(searchParams?.page) || 1
    const topic = searchParams?.topic ?? ''
    const challenges = await filteredChallenges(currentPage, topic)
    const totalChallenges = topic === '' ? await countChallenges() : challenges.length
    return (
        <section className="py-6 challenges-page">
            <ChallengeContentFrames
                data={challenges}
                tags={tagsWithChallengesRelated}
                totalChallenges={totalChallenges}
            />
        </section>
    )
}