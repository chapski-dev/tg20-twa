import { FC } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { useQuery } from 'react-query'
import { getTransfersHistory } from 'api'
import { TransferCard } from './components'
import * as S from './style'

export const MyTransactions: FC = () => {
  const userWalletAddress = useTonAddress()
  const {
    data: transfersHistory,
    isLoading: isTransferHistoryLoading,
    isSuccess: isTransferHistoryLoaded,
  } = useQuery(['my-transfers'], () => getTransfersHistory(userWalletAddress), {
    enabled: !!userWalletAddress,
  })

  if (isTransferHistoryLoading) {
    return <S.Loader />
  }

  return (
    <S.Wrapper>
      {isTransferHistoryLoaded &&
        transfersHistory.map((transfer, idx) => (
          <TransferCard
            key={idx}
            amount={transfer.delta}
            date={transfer.time}
            walletAddress={transfer.peer}
          />
        ))}
      {isTransferHistoryLoaded && !transfersHistory.length && (
        <S.DontHaveTransfersBlock>
          You dont have any transactions
        </S.DontHaveTransfersBlock>
      )}
    </S.Wrapper>
  )
}
