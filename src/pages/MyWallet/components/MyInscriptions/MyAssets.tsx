import { FC } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { useQuery } from 'react-query'
import { generatePath, useNavigate } from 'react-router-dom'
import { getWalletTokensBalances } from 'api'
import { AppRoutes } from 'constants/app'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { InscriptionCard } from './components'
import * as S from './style'

type TickProps = {
  tick: string
  balance: number
  id: string
}

const TICK_MOCK: TickProps[] = [
  {
    id: '1',
    tick: 'ton',
    balance: 3000,
  },
  {
    id: '2',
    tick: 'ton',
    balance: 3000,
  },
  {
    id: '3',
    tick: 'ton',
    balance: 3000,
  },
  {
    id: '4',
    tick: 'ton',
    balance: 3000,
  },
]

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
        {/* {isMyInscriptionsLoaded && !myInscriptions.length && (
          <S.DontHaveInscriptionsBlock>
            You dont have any inscriptions
          </S.DontHaveInscriptionsBlock>
        )}
        {currentWalletBalance && (
          <>
            <InscriptionCard balance={currentWalletBalance} tick={'ton'} />
            {isMyInscriptionsLoaded && myInscriptions.length > 0 && <S.Line />}
          </>
        )}

        {isMyInscriptionsLoaded &&
          myInscriptions.map(({ tick, balance }, idx) => (
            <>
              <InscriptionCard key={tick} balance={balance} tick={tick} />
              {idx !== myInscriptions.length - 1 && <S.Line />}
            </>
          ))} */}
        {TICK_MOCK.map(({ tick, balance }) => (
          <InscriptionCard key={tick} balance={balance} tick={tick} />
        ))}
      </S.InscriptionsWrapper>
    </S.Wrapper>
  )
}
