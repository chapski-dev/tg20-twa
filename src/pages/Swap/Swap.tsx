import React, { FC } from 'react'
import { BackButton } from 'features/BackButton'
import firstItems from './assets/items.png'
import secoundItems from './assets/items2.png'
import * as S from './style'

export const Swap: FC = () => {
  return (
    <>
      <BackButton />
      <S.Wrapper>
        <S.TopBlock>
          <S.Title>
            Coming Your Way Soon!
            <span>Quick & Easy Swap!</span>
          </S.Title>
        </S.TopBlock>
        <S.MainBlock>
          <S.Info>
            Swap your inscriptions with ease using TG20's swift multichain
            inscription swap feature for a seamless trading experience.
          </S.Info>
        </S.MainBlock>
        <S.IconsBlock>
          <S.Icons>
            <img alt="first-items" src={firstItems} />
          </S.Icons>
          <S.SecoundIcons>
            <img alt="secound-items" src={secoundItems} />
          </S.SecoundIcons>
        </S.IconsBlock>
      </S.Wrapper>
    </>
  )
}
