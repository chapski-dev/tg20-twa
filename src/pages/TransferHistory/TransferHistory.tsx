import { FC, ReactHTMLElement } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import { BackButton } from 'features/BackButton'
import {
  SvgArrowSwap,
  SvgLogoHistoryToken,
  SvgRecieveSquare,
  SvgSendSquare,
  SvgTrade,
} from 'ui/icons'
import * as S from './style'

type FunctionalProps = {
  title: string
  icon: JSX.Element
  action: () => void
}

const functionalBlocks: FunctionalProps[] = [
  {
    title: 'Send',
    icon: <SvgSendSquare />,
    action: () => alert('Send button'),
  },
  {
    title: 'Recieve',
    icon: <SvgRecieveSquare />,
    action: () => alert('Recieve button'),
  },
  { title: 'Swap', icon: <SvgArrowSwap />, action: () => alert('Swap button') },
  { title: 'Trade', icon: <SvgTrade />, action: () => alert('Trade button') },
]

const TRANSFER_MOCK = {
  balance: '280 000 000 GRAM',
  dollarCount: '800.28',
  supply: '210B',
  price: '0.001',
  volume: '2.6M',
}

export const TransferHistory: FC = (props) => {
  // const { balance, dollarCount, supply, price, volume } = props

  const navigate = useNavigate()

  const { tick } = useParams()

  console.log(tick)

  return (
    <S.Wrapper>
      <BackButton onClick={() => navigate(AppRoutes.MyWallet)} />
      <S.BalanceBlock>
        <S.TopBlock>
          <S.Logo>
            <S.BackGroundSvg>
              <SvgLogoHistoryToken />
            </S.BackGroundSvg>
          </S.Logo>
          <S.Balance>{TRANSFER_MOCK.balance}</S.Balance>
          <S.DollarCount>~ $ {TRANSFER_MOCK.dollarCount}</S.DollarCount>
        </S.TopBlock>
        <S.FunctionalBlock>
          {functionalBlocks.map(({ icon, title, action }, idx) => (
            <S.BlockWrapper key={idx} onClick={action}>
              <S.Button>{icon}</S.Button>
              <S.Text>{title}</S.Text>
            </S.BlockWrapper>
          ))}
        </S.FunctionalBlock>
      </S.BalanceBlock>
      <S.InfoTotal>
        <S.Item>
          <S.Title>Total Supply</S.Title>
          <S.Count>{TRANSFER_MOCK.supply}</S.Count>
        </S.Item>
        <S.Item>
          <S.Title>Floor Price</S.Title>
          <S.Count>${TRANSFER_MOCK.price}</S.Count>
        </S.Item>
        <S.Item>
          <S.Title>Total Volume</S.Title>
          <S.Count>{TRANSFER_MOCK.volume}</S.Count>
        </S.Item>
      </S.InfoTotal>
      <S.Line />
      <S.BtnBlock>
        <S.CheckExplorer>
          Can’t find your transaction?<span> Check explorer</span>
        </S.CheckExplorer>
      </S.BtnBlock>
    </S.Wrapper>
  )
}
