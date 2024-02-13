import { FC, useCallback } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
import { getTransfersHistory } from 'api'
import { TransferHistoryType } from 'api/types'
import { Container } from 'ui/Container/Container'
import { TransferCard } from 'ui/TransferCard/TransferCard'
import * as S from './style'

type TransformedTransfersHistory = {
  date: string
  transfers: TransferHistoryType[]
}[]

export const MyTransactions: FC = () => {
  const userWalletAddress = useTonAddress()

  const {
    data: transfersHistory,
    isLoading: isTransferHistoryLoading,
    isSuccess: isTransferHistoryLoaded,
  } = useQuery(['my-transfers'], () => getTransfersHistory(userWalletAddress), {
    enabled: !!userWalletAddress,
    select: useCallback(
      (
        data: TransferHistoryType[]
      ): { date: string; transfers: TransferHistoryType[] }[] => {
        const sortedData = data.sort((currentTransferItem, nextTransferItem) =>
          dayjs(currentTransferItem.time * 1000).diff(
            dayjs(nextTransferItem.time * 1000)
          )
        )

        const groupedData = sortedData.reduce((acc: any, item) => {
          const dateKey = dayjs(item.time * 1000).format('YYYY-MM-DD')

          if (!acc[dateKey]) {
            acc[dateKey] = {
              date: dayjs(item.time * 1000).format(' MMMM DD YYYY'),
              transfers: [],
            }
          }

          acc[dateKey].transfers.push({ ...item, time: item.time * 1000 })

          return acc
        }, {})

        const transformedData = Object.values(
          groupedData
        ).reverse() as TransformedTransfersHistory

        return transformedData
      },
      []
    ),
  })

  console.log(transfersHistory)

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
