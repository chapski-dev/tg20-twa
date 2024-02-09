import { useMemo } from 'react'
import { AppRoutes } from 'constants/app'
import { SvgArrowRight, SvgCloseCircle } from 'ui/icons'
import Coins from './assets/Coins.png'
import Credits from './assets/credit-cards.png'
import * as S from './style'
import type { PromoProps } from './type'

export const Promo = (props: PromoProps) => {
  const { variant, title, subtitle, className, onClose } = props

  const currentDisplayedImage = useMemo(
    () => (variant === 'yellow' ? Coins : Credits),
    [variant]
  )

  return (
    <S.Container className={className} variant={variant}>
      <S.Img alt={variant} src={currentDisplayedImage} />
      <S.Wrapper>
        <S.Title>{title}</S.Title>
        <S.SubtitleWrapper variant={variant}>
          <S.Subtitle to={AppRoutes.MyWallet} variant={variant}>
            {subtitle}
          </S.Subtitle>
          <SvgArrowRight />
        </S.SubtitleWrapper>
      </S.Wrapper>
      <SvgCloseCircle onClick={onClose} />
    </S.Container>
  )
}
