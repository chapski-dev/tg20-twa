
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Rare from './Rare.png';
import * as S from './style'

export const SpecialOffer = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate()

  return isOpen ? (
    <S.Container>
      <S.Wrapper>
        <S.Img alt='rare' src={Rare} />
        <div>
          <S.Title children="RARE is now Live!" />
          <S.Description children="Start Minting Today" />
          <S.Button
            children="Let’s Go"
          />
        </div>
        <S.CrossBtn
          children="×"
          onClick={() => setIsOpen(false)}
        />
      </S.Wrapper>
    </S.Container>
  ) : null;
}
