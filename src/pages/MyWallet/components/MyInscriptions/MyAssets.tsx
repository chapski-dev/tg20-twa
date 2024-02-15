import { FC } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { useQuery } from 'react-query'
import { getWalletTokensBalances } from 'api'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { InscriptionCard } from './components'
import * as S from './style'

export const MyAssets: FC = () => {
  const { currentWalletBalance } = useTelegram()

  const userWalletAddress = useTonAddress()

  const {
    data: myInscriptions,
    isLoading: isMyInscriptionsLoading,
    isSuccess: isMyInscriptionsLoaded,
  } = useQuery(
    ['my-inscriptions'],
    () => getWalletTokensBalances(userWalletAddress),
    {
      enabled: !!userWalletAddress,
    }
  )

  if (isMyInscriptionsLoading || !userWalletAddress) {
    return <S.Loader />
  }

  return (
    <S.Wrapper>
      <S.InscriptionsWrapper>
        {isMyInscriptionsLoaded && !myInscriptions.length && (
          <S.DontHaveInscriptionsBlock children=" You dont have any inscriptions" />
        )}
        {!!currentWalletBalance && (
          <>
            <InscriptionCard balance={currentWalletBalance} tick={'ton'} />
            {(isMyInscriptionsLoaded && myInscriptions.length > 0) && <S.Line />}
          </>
        )}

        {isMyInscriptionsLoaded &&
          myInscriptions.map(({ tick, balance }, idx) => (
            <>
              <InscriptionCard key={tick} balance={balance} tick={tick} />
              {idx !== myInscriptions.length - 1 && <S.Line />}
            </>
          ))}
      </S.InscriptionsWrapper>
    </S.Wrapper>
  )
}
