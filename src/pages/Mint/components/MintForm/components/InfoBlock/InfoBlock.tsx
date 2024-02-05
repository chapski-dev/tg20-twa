import { FC } from 'react'
import * as S from './style'

export const InfoBlock: FC = () => {
  return (
    <S.Wrapper>
      <S.Title children="How to get TON for sending transaction?" />
      <S.DescriptionItem>
        <S.Description children="1.Buy TON on CEX" $isBold />
        <S.Description children="Buy TON on OKX/Bybit, withdraw to your TON wallet." />
      </S.DescriptionItem>

      <S.DescriptionItem>
        <S.Description children=" 2.Bridge from Ethereum to TON network" $isBold />
        <S.Description children="If you have Toncoin(ERC20) in Ethereum, you can bridge Toncoin(ERC20)
          to TON network. Bridge: https://bridge.ton.org/" />
      </S.DescriptionItem>

      <S.Description children="Not official advice, DYOR" $isBold />
    </S.Wrapper>
  )
}
