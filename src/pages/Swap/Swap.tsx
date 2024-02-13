import React, { FC } from 'react'
import { BackButton } from 'features/BackButton'
import icon1 from './assets/icon1.png'
import icon10 from './assets/icon10.png'
import icon11 from './assets/icon11.png'
import icon12 from './assets/icon12.png'
import icon13 from './assets/icon13.png'
import icon2 from './assets/icon2.png'
import icon3 from './assets/icon3.png'
import icon4 from './assets/icon4.png'
import icon5 from './assets/icon5.png'
import icon6 from './assets/icon6.png'
import icon7 from './assets/icon7.png'
import icon8 from './assets/icon8.png'
import icon9 from './assets/icon9.png'
import * as S from './style'

type IconsProps = {
  src: string
  alt: string
}

const FIRST_ICONS_MOCK: IconsProps[] = [
  {
    src: icon1,
    alt: 'icon1',
  },
  {
    src: icon2,
    alt: 'icon2',
  },
  {
    src: icon3,
    alt: 'icon3',
  },
  {
    src: icon4,
    alt: 'icon4',
  },
  {
    src: icon5,
    alt: 'icon5',
  },
  {
    src: icon6,
    alt: 'icon6',
  },
  {
    src: icon7,
    alt: 'icon7',
  },
]

const SECOUND_ICONS_MOCK: IconsProps[] = [
  {
    src: icon8,
    alt: 'icon8',
  },
  {
    src: icon9,
    alt: 'icon9',
  },
  {
    src: icon10,
    alt: 'icon10',
  },
  {
    src: icon11,
    alt: 'icon11',
  },
  {
    src: icon12,
    alt: 'icon12',
  },
  {
    src: icon13,
    alt: 'icon13',
  },
]

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
            {FIRST_ICONS_MOCK.map(({ src, alt }, idx) => (
              <img key={idx} alt={alt} src={src} />
            ))}
          </S.Icons>
          <S.SecoundIcons>
            {SECOUND_ICONS_MOCK.map(({ src, alt }, idx) => (
              <img key={idx} alt={alt} src={src} />
            ))}
          </S.SecoundIcons>
        </S.IconsBlock>
      </S.Wrapper>
    </>
  )
}
