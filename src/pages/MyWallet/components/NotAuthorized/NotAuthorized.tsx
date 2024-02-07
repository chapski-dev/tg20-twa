import { FC } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { Container } from 'ui/Container/Container'
import { SvgBigest, SvgCheck } from 'ui/icons'
import * as S from './style'

const NOT_AUTORIZED_MOCK = [
  {
    id: 1,
    info: 'Access Inscriptions',
  },
  {
    id: 2,
    info: 'Trade & Swap',
  },
  {
    id: 3,
    info: 'Secure Transactions',
  },
]
export const NotAuthorized: FC = () => {
  const [tonConnectUI] = useTonConnectUI()

  const handleConnectWalletBtnClick = () => {
    tonConnectUI.openModal()
  }

  return (
    <S.Wrapper>
      <S.LogoWrapper>
        <SvgBigest />
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
