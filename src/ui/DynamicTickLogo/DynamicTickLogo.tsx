import { FC } from 'react'
import * as S from './style'

type DynamicTickLogoProps = {
  tick: string
  className?: string
}

export const DynamicTickLogo: FC<DynamicTickLogoProps> = (props) => {
  const { tick, className } = props

  return (
    <S.Wrapper $tick={tick} className={className}>
      {tick}
    </S.Wrapper>
  )
}
