import { createContext, useEffect, useMemo, useState, useCallback } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { useQuery } from 'react-query'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { getTokenWalletBalance, getTonPrice } from 'api'
import { AppRoutes } from 'constants/app'
import { FCWithChildren } from 'types/app'
import { WebApp, WebAppUser } from 'types/telegram'
import { OpenTelegramBlock } from 'ui/OpenTelegramBlock/OpenTelegramBlock'
import { getBalance } from 'utils/getBalance'

export type TelegramContextType = {
  webApp?: WebApp
  user?: WebAppUser
  currentUserEmail?: string
  waitListStatus?: string | null
  updateCurrentEmail?: (email: string) => void
  updateWaitListStatus?: (status: string) => void
  currentGramBalance?: number
  currentWalletBalance?: number
  tonPrice?: number
}

export const TelegramContext = createContext<TelegramContextType>({})

export const TelegramProvider: FCWithChildren = (props) => {
  const { children } = props

  const [webApp, setWebApp] = useState<WebApp | null>(null)

  const [isStartParamChecked, setIsStartParamChecked] = useState<boolean>(false)

  const userWalletAddress = useTonAddress()

  const navigate = useNavigate()

  const checkStartParam = useCallback(
    (startParamString: string) => {
      if (isStartParamChecked) {
        return
      }

      const decodedString = decodeURIComponent(
        startParamString.replace(/--/g, '%')
      )

      const currentStartParams = JSON.parse(decodedString)

      setIsStartParamChecked(true)

      switch (true) {
        case currentStartParams.tick &&
          (!currentStartParams?.type || currentStartParams?.type === 'open'):
          navigate(`${AppRoutes.Token}/${currentStartParams.tick}`)
          break
        case currentStartParams.tick && currentStartParams?.type === 'mint':
          navigate({
            pathname: AppRoutes.Inscribe,
            search: createSearchParams({
              type: currentStartParams.type,
              tick: currentStartParams.tick,
              from: 'start_param',
            }).toString(),
          })

          break
        case currentStartParams?.type === 'transfer':
          navigate({
            pathname: AppRoutes.Inscribe,
            search: createSearchParams({
              type: currentStartParams?.type,
              tick: currentStartParams.tick,
              amount: currentStartParams?.amount || '',
              address: currentStartParams?.to || '',
              from: 'start_param',
              memo: currentStartParams?.memo || '',
            }).toString(),
          })
          break
        default:
          break
      }
    },
    [isStartParamChecked, navigate]
  )

  useEffect(() => {
    const app = window.Telegram?.WebApp

    if (app) {
      app.ready()

      app.expand()

      app.enableClosingConfirmation()

      const startParam = app.initDataUnsafe.start_param

      if (startParam) {
        checkStartParam(startParam)
      }

      setWebApp(app)
    }
  }, [checkStartParam])

  const { data: currentWalletGramData } = useQuery(
    ['currentGramBalance', userWalletAddress],
    () => getTokenWalletBalance(userWalletAddress, 'gram'),
    {
      enabled: !!userWalletAddress,
    }
  )

  const { data: currentWalletBalance } = useQuery(
    ['currentWalletBalance'],
    () => getBalance(userWalletAddress),
    {
      enabled: !!userWalletAddress,
    }
  )

  const { data: tonPrice } = useQuery(['currentTonPrice'], () => getTonPrice())

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
          currentGramBalance: currentWalletGramData?.balance,
          currentWalletBalance,
          tonPrice,
        }
      : {}
  }, [currentWalletBalance, currentWalletGramData?.balance, tonPrice, webApp])

  if (webApp && !webApp.initDataUnsafe.user) {
    return <OpenTelegramBlock />
  }

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  )
}
