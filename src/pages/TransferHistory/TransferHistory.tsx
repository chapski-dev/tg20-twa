import { FC, useMemo } from 'react'
import { fromNano } from '@ton/core'
import { useTonAddress } from '@tonconnect/ui-react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getMarketplaceTokenStats, getTokenWalletBalance } from 'api'
import { AppRoutes } from 'constants/app'
import { BackButton } from 'features/BackButton'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import {
  SvgArrowSwap,
  SvgLogoHistoryToken,
  SvgRecieveSquare,
  SvgTrade,
} from 'ui/icons'
import { convertNumberToShortFormat } from 'utils/convertNumberToShortFormat'
import * as S from './style'

type FunctionalProps = {
  title: string
  icon: JSX.Element
  action: () => void
}

const functionalBlocks: FunctionalProps[] = [
  {
    title: 'Recieve',
    icon: <SvgRecieveSquare />,
    action: () => alert('Recieve button'),
  },
  { title: 'Swap', icon: <SvgArrowSwap />, action: () => alert('Swap button') },
  { title: 'Trade', icon: <SvgTrade />, action: () => alert('Trade button') },
]

const GRAM_PRICE = 0.000004

export const TransferHistory: FC = () => {
  const { tonPrice } = useTelegram()

  const userWalletAddress = useTonAddress()

  const navigate = useNavigate()

  const { tick } = useParams()

  const { data: marketplaceGramStats } = useQuery(
    ['makretplaceTokenStats', tick, tonPrice, tick],
    () => getMarketplaceTokenStats({ tick: tick as string }),
    {
      enabled: !!tick && !!tonPrice,
    }
  )

  const { data: currentWalletTickData } = useQuery(
    ['currentGramBalance', userWalletAddress, tick],
    () => getTokenWalletBalance(userWalletAddress, tick as string),
    {
      enabled: !!userWalletAddress,
    }
  )

  const currentTokenPrice = useMemo(() => {
    if (!tonPrice || !currentWalletTickData || tick !== 'gram') {
      return
    }

    return currentWalletTickData.balance * GRAM_PRICE
  }, [currentWalletTickData, tick, tonPrice])

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
          <S.Balance>
            {currentWalletTickData?.balance || '-.--'} {tick?.toUpperCase()}
          </S.Balance>
          {tick === 'gram' && (
            <S.DollarCount>~ ${currentTokenPrice}</S.DollarCount>
          )}
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
          <S.Count>{210}B</S.Count>
        </S.Item>
        <S.Item>
          <S.Title>Floor Price</S.Title>
          <S.Count>
            $
            {(marketplaceGramStats &&
              tonPrice &&
              (
                tonPrice *
                Number(fromNano(+marketplaceGramStats.floor_price.toFixed(0)))
              ).toFixed(7)) ||
              '-.--'}
          </S.Count>
        </S.Item>
        <S.Item>
          <S.Title>Total Volume</S.Title>
          <S.Count>
            {(marketplaceGramStats &&
              convertNumberToShortFormat(marketplaceGramStats.total_volume)) ||
              '-.--'}
          </S.Count>
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
