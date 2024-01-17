'use client'

import React, { HTMLAttributes } from "react"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import 'swiper/scss'
import 'swiper/scss/navigation'
import { SwiperOptions, Swiper as SwiperCore } from "swiper/types"

interface ICarouselProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    allowNavigation?: boolean;
    options?: SwiperOptions;
}

const Carousel: React.FC<ICarouselProps> = ({
    children,
    options,
    className,
}) => {
    const [swiper, setSwiper] = React.useState<SwiperCore | null>(null)
    const navigationPrevRef = React.useRef<HTMLDivElement>(null)
    const navigationNextRef = React.useRef<HTMLDivElement>(null)

    const onSwiperInit = (swiper: SwiperCore) => {
        setSwiper(swiper)
    }

    const goPrev = () => {
        if (swiper) {
            swiper.slidePrev()
        }
    }

    const goNext = () => {
        if (swiper) {
            swiper.slideNext()
        }
    }

    const carouselOpts: SwiperOptions = {
        navigation: {
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current
        },
        ...options
    }

    return (
        <Swiper
            navigation={true}
            modules={[Navigation]}
            onSwiper={onSwiperInit}
            {...carouselOpts}
            className={`swiper-container ${className ?? ''}`}
        >
            {React.Children.map(children, (child, index) => {
                return <SwiperSlide key={index}>{child}</SwiperSlide>
            })}

            {options?.pagination && <div className="swiper-pagination w-full bottom-1"></div>}
            <div className="swiper-nav">
                <div
                    ref={navigationPrevRef}
                    className="swiper-button-prev swiper-button-secondary"
                    onClick={goPrev}
                ></div>
                <div
                    ref={navigationNextRef}
                    className="swiper-button-next swiper-button-secondary"
                    onClick={goNext}
                ></div>
            </div>
        </Swiper>
    )
}

const CarouselItem = ({
    children
}: Readonly<{
    children: React.ReactNode
}>) => (<SwiperSlide>{children}</SwiperSlide>)

export {
    Carousel,
    CarouselItem
}