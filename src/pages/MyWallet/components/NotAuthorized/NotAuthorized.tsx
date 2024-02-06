import { FC } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { Container } from 'ui/Container/Container'
import { SvgBigestLogo, SvgCheck } from 'ui/icons'
import linia from './linia.png'
import { NOT_AUTORIZED_MOCK } from './mock'
import * as S from './style'

export const NotAuthorized: FC = () => {
  const Address = useTonAddress()

  const [tonConnectUI] = useTonConnectUI()

  const handleConnectWalletBtnClick = () => {
    tonConnectUI.openModal()
  }
  console.log('Address', Address)

  return (
    <S.Wrapper>
      <S.LogoWrapper>
        <SvgBigestLogo />
      </S.LogoWrapper>
      <S.Title>
        Your digital wallet,
        <br /> now on <S.Biggest>TG20.</S.Biggest>
      </S.Title>
      {NOT_AUTORIZED_MOCK.map((items) => (
        <S.Description key={items.id}>
          <SvgCheck />
          {items.info}
        </S.Description>
      ))}
      <S.BtnWrapper onClick={handleConnectWalletBtnClick}>
        Connect Wallet
      </S.BtnWrapper>
    </S.Wrapper>
  )
}
