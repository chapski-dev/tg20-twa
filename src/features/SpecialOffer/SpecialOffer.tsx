import { FC } from 'react'
import { SvgGramLogoHome } from 'ui/icons'
import * as S from './style'

export const SpecialOffer: FC = () => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.SvgWrap>
          <SvgGramLogoHome />
        </S.SvgWrap>
        <S.ContantWrap>
          <S.Title children="Discover the Power of GRAM!" />
          <S.Description children="Inscription token that is heart of TG20 Inscriptions platform. Unique and the most efficient way to take part in BRC-20-like standards on multiple chains." />
        </S.ContantWrap>
      </S.Wrapper>
    </S.Container>
  )
}
