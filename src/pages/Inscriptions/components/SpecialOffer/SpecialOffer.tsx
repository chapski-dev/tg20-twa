
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SvgGramIcon } from 'ui/icons'
import * as S from './style'

export const SpecialOffer = () => {

  const navigate = useNavigate()

  return (
    <S.Wrapper>
      <SvgGramIcon style={{ maxWidth: 78 }} />
      <div>
        <S.Title children="RARE is now Live!" />
        <S.Description children="Start Minting Today" />
        <S.Button
          children="Let’s Go"
        />
      </div>
    </S.Wrapper>
  )
}
