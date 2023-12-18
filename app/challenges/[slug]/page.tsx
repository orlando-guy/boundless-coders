import { fetchChallengeBySlug } from '@/app/lib/data'
import { mdToHTML } from '@/app/lib/utils'
import { BannerWithBreadCrumbs as Banner } from '@/app/ui/banners'
import ChallengeDetail from '@/app/ui/challenge-detail'
import { notFound } from 'next/navigation'

export default async function ChallengePage({ params }
    : Readonly<{
        params: {
            slug: string
        }
    }>
) {
    const slug = decodeURIComponent(params.slug)

    const challenge = await fetchChallengeBySlug(slug)

    if (!challenge){
        notFound()
    }

    const challengeContent = await mdToHTML(challenge.content)

    return (
        <section className="pb-6">
            <Banner
                title={challenge.title}
                subtitle={challenge.description}
            />
            <ChallengeDetail
                content={challengeContent}
                level={challenge.level}
                tags={challenge.tags}
            />
        </section>
    )
}