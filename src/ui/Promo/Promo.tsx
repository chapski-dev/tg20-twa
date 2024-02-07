import { useState } from 'react'
import { AppRoutes } from 'constants/app'
import { SvgArrowRight, SvgCloseCircle } from 'ui/icons'
import Coins from './assets/Coins.png'
import Credits from './assets/credit-cards.png'
import * as S from './style'
import type { PromoProps } from './type'

export const Promo = (props: PromoProps) => {
  const { variant, title, subtitle, className } = props
  const [isVisible, setIsVisible] = useState(true)

  const handleRemoveClick = () => {
    setIsVisible(false)
  }
  if (isVisible) {
    const currentVisible = () => {
      if (variant === 'yellow') return Coins
      else {
        return Credits
      }
    }

    return (
      <S.Container className={className} variant={variant}>
        <S.Img alt={variant} src={currentVisible()} />
        <S.Wrapper>
          <S.Title>{title}</S.Title>
          <S.SubtitleWrapper variant={variant}>
            <S.Subtitle to={AppRoutes.MyWallet} variant={variant}>
              {subtitle}
            </S.Subtitle>
            <SvgArrowRight />
          </S.SubtitleWrapper>
        </S.Wrapper>
        <SvgCloseCircle onClick={handleRemoveClick} />
      </S.Container>
    )
  }

  return null
}
