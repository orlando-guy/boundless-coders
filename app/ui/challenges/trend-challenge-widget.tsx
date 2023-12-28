import React from 'react'
import { DefaultTile } from '@/app/ui/tiles/tiles'
import { Carousel } from '@/app/ui/carousel/carousels'

const TrendChallengeWidget = () => {
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
                        description='Explorer BOUNDLESS CODERS avec cette sélection de challenges taille sur mesure pour vous aider à booster rapidement vos aptitudes'
                        className='td-challenges-widget__item item--intro'
                    />
                    <DefaultTile
                        title='Booster'
                        description='Explorer BOUNDLESS CODERS avec cette sélection de challenges taille sur mesure pour vous aider à booster rapidement vos aptitudes'
                        className='td-challenges-widget__item'
                    />
                    <DefaultTile
                        title='Booster'
                        description='Explorer BOUNDLESS CODERS avec cette sélection de challenges taille sur mesure pour vous aider à booster rapidement vos aptitudes'
                        className='td-challenges-widget__item'
                    />
                    <DefaultTile
                        title='Booster'
                        description='Explorer BOUNDLESS CODERS avec cette sélection de challenges taille sur mesure pour vous aider à booster rapidement vos aptitudes'
                        className='td-challenges-widget__item'
                    />
                    <DefaultTile
                        title='Booster'
                        description='Explorer BOUNDLESS CODERS avec cette sélection de challenges taille sur mesure pour vous aider à booster rapidement vos aptitudes'
                        className='td-challenges-widget__item'
                    />
                </Carousel>
            </div>
        </div>
    )
}

export default TrendChallengeWidget