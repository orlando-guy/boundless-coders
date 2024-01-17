import React from 'react'
import { ClickableWithCustomIcon, DefaultTile } from '@/app/ui/tiles/tiles'
import { Carousel } from '@/app/ui/carousel/carousels'
import { ChallengesWithTags } from '@/app/lib/definitions'

const TrendChallengeWidget = ({
    challenges
}: Readonly<{
    challenges: ChallengesWithTags
}>) => {
    return (
        <div className="td-challenges-widget">
            <div className="td-challenges-widget__title">
                <h3>Pour vous</h3>
            </div>
            <div className="td-challenges-widget__body">
                <Carousel
                    className="td-challenges-widget__body-items"
                    options={{
                        autoplay: false,
                        loop: false,
                        slidesPerView: 1,
                        breakpoints: {
                            720: {
                                slidesPerView: 3,
                            },
                            1056: {
                                slidesPerView: 4
                            }
                        }
                    }}
                >
                    <DefaultTile
                        title='Booster'
                        description='Explorer BOUNDLESS CODERS avec cette sélection de challenges taillé sur mesure pour vous aider à booster rapidement vos aptitudes'
                        className='td-challenges-widget__item item--intro'
                    />
                    {challenges.length > 0 && challenges.map(challenge => (
                        <ClickableWithCustomIcon
                            title={challenge.title}
                            href={`/challenges/${challenge.slug}`}
                            tags={challenge.tags}
                            description={challenge.description}
                            theme="g90"
                            className='td-challenges-widget__item'
                            key={challenge.slug}
                        />
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default TrendChallengeWidget