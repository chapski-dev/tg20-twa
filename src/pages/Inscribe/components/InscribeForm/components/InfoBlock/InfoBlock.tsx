import { FC } from 'react'
import * as S from './style'

export const InfoBlock: FC = () => {
  return (
    <S.Wrapper>
      <S.Title>How to get TON for sending transaction?</S.Title>
      <S.DescriptionItem>
        <S.Description $isBold>1.Buy TON on CEX</S.Description>
        <S.Description>
          Buy TON on OKX/Bybit, withdraw to your TON wallet.
        </S.Description>
      </S.DescriptionItem>

      <S.DescriptionItem>
        <S.Description $isBold>
          2.Bridge from Ethereum to TON network
        </S.Description>
        <S.Description>
          If you have Toncoin(ERC20) in Ethereum, you can bridge Toncoin(ERC20)
          to TON network. Bridge: https://bridge.ton.org/
        </S.Description>
      </S.DescriptionItem>

      <S.Description $isBold>Not official advice, DYOR</S.Description>
    </S.Wrapper>
  )
}
