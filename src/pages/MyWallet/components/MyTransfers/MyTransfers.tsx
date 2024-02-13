import { FC, useCallback } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { useQuery } from 'react-query'
import { getTransfersHistory } from 'api'
import { TransferHistoryType } from 'api/types'
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

  if (isTransferHistoryLoading) {
    return <S.Loader />
  }

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
      </S.Wrapper>
    </Container>
  )
}
