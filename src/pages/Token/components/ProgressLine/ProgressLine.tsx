import { FC } from 'react'
import * as S from './style'

type ProgressLineProps = {
  mintedSupplyPercent: number
}

export const ProgressLine: FC<ProgressLineProps> = (props) => {
  const { mintedSupplyPercent } = props

  return (
    <S.Wrapper>
      <S.Line $widthPercent={mintedSupplyPercent} />
    </S.Wrapper>
  )
}
