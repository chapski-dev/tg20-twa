import { FC } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import Skeleton from 'react-loading-skeleton'
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

  return (
    <S.Wrapper>
      <S.InscriptionsWrapper>
        {isMyInscriptionsLoaded && !myInscriptions.length && (
          <S.DontHaveInscriptionsBlock children=" You dont have any inscriptions" />
        )}
        {isMyInscriptionsLoading && <SkeletonMyTrans />}
        {!!currentWalletBalance && (
          <>
            <InscriptionCard
              balance={currentWalletBalance}
              floor_price={null}
              tick={'ton'}
            />
            {isMyInscriptionsLoaded && myInscriptions.length > 0 && <S.Line />}
          </>
        )}

        {isMyInscriptionsLoaded &&
          myInscriptions.map(({ tick, balance, floor_price }, idx) => (
            <>
              <InscriptionCard
                key={tick}
                balance={balance}
                floor_price={floor_price}
                tick={tick}
              />
              {idx !== myInscriptions.length - 1 && <S.Line />}
            </>
          ))}
      </S.InscriptionsWrapper>
    </S.Wrapper>
  )
}

export const SkeletonMyTrans = () => (
  <S.SkeletonTrans>
    <div style={{ width: '65%' }}>
      <Skeleton height={'26px'} />
    </div>
  </S.SkeletonTrans>
)
