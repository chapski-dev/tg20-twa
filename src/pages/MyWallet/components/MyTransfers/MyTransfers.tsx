import { FC, useCallback } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import Skeleton from 'react-loading-skeleton'
import { useQuery } from 'react-query'
import { getTransfersHistory } from 'api'
import { TransferHistoryType } from 'api/types'
import { theme } from 'assets/style/theme'
import { Container } from 'ui/Container/Container'
import { TransferCard } from 'ui/TransferCard/TransferCard'
import { transformTransferHistoryByDate } from 'utils/transformTransferHistoryByDate'
import * as S from './style'

export const MyTransactions: FC = () => {
  const userWalletAddress = useTonAddress()

  const {
    data: transfersHistory,
    isLoading: isTransferHistoryLoading,
    isSuccess: isTransferHistoryLoaded,
  } = useQuery(['my-transfers'], () => getTransfersHistory(userWalletAddress), {
    enabled: !!userWalletAddress,
    select: useCallback(
      (data: TransferHistoryType[]) => transformTransferHistoryByDate(data),
      []
    ),
  })

  return (
    <Container>
      <S.Wrapper>
        {isTransferHistoryLoaded &&
          transfersHistory.map(({ date, transfers }) => (
            <S.DateWrapper>
              <S.DateLabel>{date}</S.DateLabel>

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
        {/* {isTransferHistoryLoaded &&
          transfersHistory.map((transfer, idx) => (
            <TransferCard
              key={idx}
              amount={transfer.delta}
              date={transfer.time}
              walletAddress={transfer.peer}
            />
          ))} */}
        {isTransferHistoryLoaded && !transfersHistory.length && (
          <S.DontHaveTransfersBlock>
            You dont have any transactions
          </S.DontHaveTransfersBlock>
        )}
        {isTransferHistoryLoading && <SkeletonMyTrans />}
      </S.Wrapper>
    </Container>
  )
}

export const SkeletonMyTrans = () => (
  <S.SkeletonTrans>
    <div style={{ width: '65%' }}>
      <Skeleton height={'26px'} />
    </div>
  </S.SkeletonTrans>
)
