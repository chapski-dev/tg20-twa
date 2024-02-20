import { FC, useContext, useEffect, useState } from 'react'
import { SendTransactionRequest, useTonAddress } from '@tonconnect/ui-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { swapBanner } from 'assets/banners/big'
import { AppRoutes } from 'constants/app'
import { BackButton } from 'features/BackButton'
import { HeaderUserBalance } from 'features/HeaderUserBalance'
import { ActionsStatusContext } from 'providers/ActionsStatusProvider'
import { DeployForm } from './components'
import * as S from './style'

export type CurrentConfirmData = {
  messages: SendTransactionRequest['messages']
  fee: string
  tick: string
  balance: number
  interval: number | null
}

const actionStatusDictionary = {
  failed: 'Failed',
  in_progress: 'In Progress',
  success: 'Success',
} as const

export const Deploy: FC = () => {
  const [searchParams] = useSearchParams()

  const [currentConfirmData, setCurrentConfirmData] =
    useState<CurrentConfirmData | null>(null)
  const [intervalFreeze, setIntervalFreeze] = useState(0)

  const fromSearchParam = searchParams.get('from')

  const { renderActionStatusData } = useContext(ActionsStatusContext)

  const userWalletAddress = useTonAddress()

  useEffect(() => {
    if (intervalFreeze && intervalFreeze > 0) {
      const intervalId = setInterval(() => {
        setIntervalFreeze((prev) => Number(prev) - 1)
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [intervalFreeze])

  const navigate = useNavigate()

  return (
    <>
      {userWalletAddress && <HeaderUserBalance />}
      <BackButton
        onClick={() =>
          fromSearchParam === 'start_param'
            ? navigate(AppRoutes.Home)
            : navigate(-1)
        }
      />
      <S.Wrapper>
        <S.Container>
          <S.Title children="Deploy your own token with ease!" />

          <DeployForm
            currentConfirmData={currentConfirmData}
            intervalFreeze={intervalFreeze}
            setCurrentConfirmData={setCurrentConfirmData}
          />
          <S.StatusBlocks>
            {renderActionStatusData?.map((el, i: number) => (
              <S.StatusBlock key={i}>
                <S.StatusBlockLabel
                  children={`${el.tick}: ${el.type.toUpperCase()}`}
                />
                <S.StatusBlockLabel
                  children={actionStatusDictionary[el.status].toUpperCase()}
                  $status={el.status}
                />
              </S.StatusBlock>
            ))}
          </S.StatusBlocks>
        </S.Container>
        <S.BannerWrapper>
          <S.BannerImage
            onClick={() => navigate(AppRoutes.Marketplace)}
            src={swapBanner}
          />
        </S.BannerWrapper>
      </S.Wrapper>
    </>
  )
}
