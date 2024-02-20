import React, { FC } from 'react'

import icons from './assets/items.png'
import * as S from './style'

export const Swap: FC = () => {
  return (
    <>
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
          <img alt="#" src={icons} />
        </S.IconsBlock>
      </S.Wrapper>
    </>
  )
}
