import { FC, useCallback, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Promo } from 'ui/Promo'
import { PromoProps } from 'ui/Promo/type'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import * as S from './style'

type PromoSlide = PromoProps & {
  id: number
}

const promoSlides: PromoSlide[] = [
  {
    id: 1,
    title: 'Add Crypto from Binance or Coinbase',
    subtitle: 'Deposit now',
    variant: 'yellow',
  },
  {
    id: 2,
    title: 'See what’s new in your wallet!',
    subtitle: 'Explore wallet',
    variant: 'purple',
  },
  {
    id: 3,
    title: 'Add Crypto from Binance or Coinbase',
    subtitle: 'Deposit now',
    variant: 'yellow',
  },
  {
    id: 4,
    title: 'See what’s new in your wallet!',
    subtitle: 'Explore wallet',
    variant: 'purple',
  },
]

export const PromoSlider: FC = () => {
  const [currentPromoSlides, setCurrentPromoSlides] =
    useState<PromoSlide[]>(promoSlides)

  const handlePromoCloseClick = useCallback((closedId: number) => {
    setCurrentPromoSlides((prev) => prev.filter(({ id }) => id !== closedId))
  }, [])

  return (
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
  )
}
