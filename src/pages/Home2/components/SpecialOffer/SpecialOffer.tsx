
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from './style'
import Rare from '../../assets/Rare.png';
export const SpecialOffer = () => {

  const navigate = useNavigate()

return (
  <S.Container>
      <S.Wrapper>
    <S.Img src={Rare} alt='rare'/>
  <div>
    <S.Title children="RARE is now Live!" />
    <S.Description children="Start Minting Today" />
    <S.Button
      children="Let’s Go"
    />
  </div>
</S.Wrapper>

  </S.Container>

)
}
