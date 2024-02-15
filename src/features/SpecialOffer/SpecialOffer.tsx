import React, { FC, useState } from 'react'
import Rare from './Rare.png'
import * as S from './style'

export const SpecialOffer: FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  return isOpen ? (
    <S.Container className="special-offer-container">
      <S.Wrapper className="special-offer-wrapper">
        <S.ImgWrap>
          <S.Img alt="rare" src={Rare} />
        </S.ImgWrap>
        <S.ContantWrap>
          <S.Title children="RARE is now Live!" />
          <S.Description children="Start Minting Today" />
          <S.Button children="Let’s Go" />
        </S.ContantWrap>

        <S.CrossBtn onClick={() => setIsOpen(false)} />
      </S.Wrapper>
    </S.Container>
  ) : null
}
