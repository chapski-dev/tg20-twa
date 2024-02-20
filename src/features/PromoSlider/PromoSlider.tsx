import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import * as S from './style'

import { PromoSlide } from './types'

type PromoSliderProps = {
  slides: PromoSlide[]
}

export const PromoSlider: FC<PromoSliderProps> = (props) => {
  const { slides } = props

  const { webApp } = useTelegram()

  const navigate = useNavigate()

  const handlePromoSlideClick = (link: string, isExternal?: boolean) => {
    if (isExternal) {
      webApp?.openLink(link)

      return
    }

    navigate(link)
  }

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
        {/* {slides.map(({ id, subtitle, title, variant }) => (
          <SwiperSlide>
            <Promo
              key={id}
              subtitle={subtitle}
              title={title}
              variant={variant}
            />
          </SwiperSlide>
        ))} */}
        {slides.map(({ image, link, isExternal }) => (
          <SwiperSlide
            key={image}
            onClick={() => handlePromoSlideClick(link, isExternal)}
          >
            <S.PromoImage alt="promo_banner" src={image} />
          </SwiperSlide>
        ))}
        {slides.length > 0 && (
          <SwiperSlide>
            <S.EmptySlide />
          </SwiperSlide>
        )}
      </Swiper>
    </S.CarouselContainer>
  )
}
