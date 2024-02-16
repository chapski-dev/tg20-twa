import { FC, useCallback, useMemo, useState } from 'react'
import { fromNano } from '@ton/core'
import { useTonAddress } from '@tonconnect/ui-react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getMarketplaceTokenStats,
  getTokenWalletBalance,
  getTransfersHistory,
} from 'api'
import { TransferHistoryType } from 'api/types'
import { AppRoutes } from 'constants/app'
import { BackButton } from 'features/BackButton'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { ReceivePopup } from 'ui'
import { Container } from 'ui/Container/Container'
import {
  SvgArrowSwap,
  SvgLogoHistoryToken,
  SvgRecieveSquare,
  SvgSendSquare,
  SvgTrade,
} from 'ui/icons'
import { TransferCard } from 'ui/TransferCard/TransferCard'
import { convertNumberToShortFormat } from 'utils/convertNumberToShortFormat'
import { transformTransferHistoryByDate } from 'utils/transformTransferHistoryByDate'
import { SendPopup } from './components'
import * as S from './style'

type FunctionalProps = {
  title: string
  icon: JSX.Element
  action: () => void
}

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
  const { data: transfersHistory, isSuccess: isTransferHistoryLoaded } =
    useQuery(
      [`my-${tick}-transfers`],
      () => getTransfersHistory(userWalletAddress),
      {
        enabled: !!userWalletAddress,
        select: useCallback(
          (data: TransferHistoryType[]) => {
            const currentTickTransfers = data.filter(
              (transfer) => transfer.tick === tick
            )

            const transformedData =
              transformTransferHistoryByDate(currentTickTransfers)

            return transformedData
          },
          [tick]
        ),
      }
    )

  const currentTokenPrice = useMemo(() => {
    if (!tonPrice || !currentWalletTickData || tick !== 'gram') {
      return
    }

    return currentWalletTickData.balance * GRAM_PRICE
  }, [currentWalletTickData, tick, tonPrice])

  const [sendPopuplOpen, setSendPopuplOpen] = useState(false)

  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState<boolean>(false)

  const toggleRecieveModal = () => {
    setIsReceiveModalOpen((prev) => !prev)
  }

  const actionsBlocks: FunctionalProps[] = useMemo(
    () => [
      {
        title: 'Send',
        icon: <SvgSendSquare />,
        action: () => setSendPopuplOpen(true),
      },
      {
        title: 'Recieve',
        icon: <SvgRecieveSquare />,
        action: toggleRecieveModal,
      },
      {
        title: 'Swap',
        icon: <SvgArrowSwap />,
        action: () => navigate(AppRoutes.Swap),
      },
      {
        title: 'Trade',
        icon: <SvgTrade />,
        action: () => navigate(AppRoutes.Marketplace),
      },
    ],
    []
  )

  return (
    <>
      <S.Wrapper>
        <BackButton onClick={() => navigate(AppRoutes.MyWallet)} />
        <S.BalanceBlock>
          <S.TopBlock>
            <S.Logo>
              <S.BackGroundSvg>
                <SvgLogoHistoryToken />
              </S.BackGroundSvg>
            </S.Logo>
            <S.Balance
              children={`${currentWalletTickData?.balance || '-.--'} ${
                tick?.toUpperCase() || ''
              }`}
            />
            {tick === 'gram' && (
              <S.DollarCount children={`~ $${currentTokenPrice}`} />
            )}
          </S.TopBlock>
          <S.FunctionalBlock>
            {actionsBlocks.map(({ icon, title, action }, idx) => (
              <S.BlockWrapper key={idx} onClick={action}>
                <S.Button children={icon} />
                <S.Text children={title} />
              </S.BlockWrapper>
            ))}
          </S.FunctionalBlock>
        </S.BalanceBlock>
        <S.InfoTotal>
          <S.Item>
            <S.Title children="Total Supply" />
            <S.Count children={`${210}B`} />
          </S.Item>
          <S.Item>
            <S.Title children="Floor Price" />
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
            <S.Title children="Total Volume" />
            <S.Count
              children={`${
                convertNumberToShortFormat(
                  marketplaceGramStats?.total_volume || 0
                ) || '-.--'
              }`}
            />
          </S.Item>
        </S.InfoTotal>
        <S.Line />
        <Container>
          <S.TransfersWrapper>
            {isTransferHistoryLoaded &&
              transfersHistory.map(({ date, transfers }) => (
                <S.DateWrapper>
                  <S.DateLabel children={date} />
                  {transfers.map((transfer, idx) => (
                    <TransferCard
                      key={idx}
                      amount={transfer.delta}
                      hash={transfer.hash}
                      tick={transfer.tick}
                      walletAddress={transfer.peer}
                    />
                  ))}
                </S.DateWrapper>
              ))}
          </S.TransfersWrapper>
        </Container>
        <S.BtnBlock>
          <S.CheckExplorer>
            Can’t find your transaction?<span> Check explorer</span>
          </S.CheckExplorer>
        </S.BtnBlock>
      </S.Wrapper>
      {sendPopuplOpen && !!tick && (
        <SendPopup onClose={() => setSendPopuplOpen(false)} tick={tick} />
      )}
      {isReceiveModalOpen && <ReceivePopup onClose={toggleRecieveModal} />}
    </>
  )
}
