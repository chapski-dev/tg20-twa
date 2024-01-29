
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SvgGramIcon } from 'ui/icons'
import * as S from './style'

export const SpecialOffer = () => {

  const navigate = useNavigate()

  return (
    <S.Wrapper>
      <S.IconWrapper>
        <SvgGramIcon style={{ maxWidth: 78 }} />
      </S.IconWrapper>
      <S.Info>
        <div>
          <S.Title children="RARE is now Live!" />
          <S.Description children="Start Minting Today" />
        </div>
        <S.Button
          children="Let’s Go"
        />
      </S.Info>
    </S.Wrapper>
  )
}
