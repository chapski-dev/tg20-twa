import { FC, useCallback, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Promo } from 'ui/Promo'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import * as S from './style'
import { PromoSlide } from './types'

type PromoSliderProps = {
  slides: PromoSlide[]
}

export const PromoSlider: FC<PromoSliderProps> = (props) => {
  const { slides } = props

  const [currentPromoSlides, setCurrentPromoSlides] =
    useState<PromoSlide[]>(slides)

  const handlePromoCloseClick = useCallback((closedId: number) => {
    setCurrentPromoSlides((prev) => prev.filter(({ id }) => id !== closedId))
  }, [])

  return (
    <S.CarouselContainer>
      <Swiper
        grabCursor
        onSlideChange={() => {
          console.log('slider change')
        }}
        slidesPerView={2}
        spaceBetween={170}
      >
        {currentPromoSlides.map(({ id, subtitle, title, variant }) => (
          <SwiperSlide>
            <Promo
              key={id}
              onClose={() => handlePromoCloseClick(id)}
              subtitle={subtitle}
              title={title}
              variant={variant}
            />
          </SwiperSlide>
        ))}
        {currentPromoSlides.length > 0 && (
          <SwiperSlide>
            <S.EmptySlide />
          </SwiperSlide>
        )}
      </Swiper>
    </S.CarouselContainer>
  )
}
