import { createContext, useEffect, useMemo, useCallback, useState } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import dayjs from 'dayjs'
import { getTokenInfo, getTokenWalletBalance, getTransfersHistory } from 'api'
import { ActionStatusData } from 'pages/Inscribe/types'
import { FCWithChildren } from 'types/app'

export type ActionsStatusContextType = {
  checkBalanceChange?: () => void
  updateRenderActionStatusData?: (actionStatusData: ActionStatusData[]) => void
  renderActionStatusData?: ActionStatusData[]
  checkTransferValid?: () => void
  checkContractDeployStatus?: () => void
}

export const ActionsStatusContext = createContext<ActionsStatusContextType>({})

export const ActionsStatusProvider: FCWithChildren = (props) => {
  const { children } = props

  const [renderActionStatusData, setRenderActionStatusData] = useState<
    ActionStatusData[]
  >([])

  const userWalletAddress = useTonAddress()

  const checkContractDeployStatus = useCallback(() => {
    setTimeout(async () => {
      const storedActionStatusesData = localStorage.getItem('action_status')

      const currentActionStatusData = JSON.parse(
        storedActionStatusesData!
      ).find(({ type }: ActionStatusData) => type === 'deploy')

      try {
        if (
          currentActionStatusData &&
          currentActionStatusData.time &&
          userWalletAddress
        ) {
          const currentTokenDataByTick = await getTokenInfo(
            currentActionStatusData.tick
          )

          if (currentTokenDataByTick?.address) {
            alert(`Success, ${currentActionStatusData.tick} was deployed`)

            setRenderActionStatusData((prev) =>
              prev.map((actionData) => {
                if (actionData.tick === currentActionStatusData.tick) {
                  return {
                    ...actionData,
                    status: 'success',
                  }
                }

                return actionData
              })
            )

            localStorage.removeItem('action_status')

            setTimeout(() => {
              setRenderActionStatusData([])
            }, 10000)
          } else {
            if (
              dayjs().diff(dayjs(currentActionStatusData.time), 'minute') >= 3
            ) {
              const updatedActionStatusData: ActionStatusData[] = [
                {
                  tick: currentActionStatusData.tick,
                  type: 'deploy',
                  status: 'failed',
                  current_value: '',
                  time: dayjs() as any,
                },
              ]

              setRenderActionStatusData(updatedActionStatusData)

              localStorage.setItem(
                'action_status',
                JSON.stringify(updatedActionStatusData)
              )

              alert(
                `Something went wrong:( Your token (${currentActionStatusData.tick}) have not deployed, please, try again`
              )
            } else {
              setTimeout(() => checkContractDeployStatus(), 30 * 1000)
            }
          }

          return
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }, 1000)
  }, [userWalletAddress])

  const checkBalanceChange = useCallback(async () => {
    setTimeout(async () => {
      const storedActionStatusesData = localStorage.getItem('action_status')

      const currentActionStatusData = JSON.parse(
        storedActionStatusesData!
      ).find(({ type }: ActionStatusData) => type === 'mint')

      try {
        if (
          userWalletAddress &&
          storedActionStatusesData &&
          currentActionStatusData &&
          currentActionStatusData.time
        ) {
          const currentWalletAdddressTokenBalance = await getTokenWalletBalance(
            userWalletAddress,
            currentActionStatusData.tick
          )

          if (currentWalletAdddressTokenBalance.address) {
            if (
              currentWalletAdddressTokenBalance.balance !==
              Number(currentActionStatusData.current_value)
            ) {
              alert(`Success, ${currentActionStatusData.tick} was minted`)

              setRenderActionStatusData((prev) =>
                prev.map((actionData) => {
                  if (actionData.tick === currentActionStatusData.tick) {
                    return {
                      ...actionData,
                      status: 'success',
                    }
                  }

                  return actionData
                })
              )

              localStorage.removeItem('action_status')

              setTimeout(() => {
                setRenderActionStatusData([])
              }, 10000)
            } else {
              if (
                dayjs().diff(dayjs(currentActionStatusData.time), 'minute') >= 3
              ) {
                const updatedActionStatusData: ActionStatusData[] = [
                  {
                    tick: currentActionStatusData.tick,
                    type: 'mint',
                    status: 'failed',
                    current_value: currentWalletAdddressTokenBalance
                      ? currentWalletAdddressTokenBalance.balance.toString()
                      : '0',
                    time: dayjs() as any,
                  },
                ]

                setRenderActionStatusData(updatedActionStatusData)

                localStorage.setItem(
                  'action_status',
                  JSON.stringify(updatedActionStatusData)
                )

                alert(
                  `Something went wrong:( Your tokens (${currentActionStatusData.tick}) have not minted, please, try again`
                )
              } else {
                setTimeout(() => checkBalanceChange(), 30 * 1000)
              }
            }
          }
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }, 10000)
  }, [userWalletAddress])

  const checkTransferValid = useCallback(() => {
    setTimeout(async () => {
      const storedActionStatusesData = localStorage.getItem('action_status')

      const currentActionStatusData = JSON.parse(
        storedActionStatusesData!
      ).find(({ type }: ActionStatusData) => type === 'transfer')

      const storedTransfersHistory = JSON.parse(
        currentActionStatusData.current_value
      )

      try {
        if (
          userWalletAddress &&
          storedActionStatusesData &&
          currentActionStatusData.current_value
        ) {
          const currentTransfersHistory = await getTransfersHistory(
            userWalletAddress
          )

          if (currentTransfersHistory.length >= storedTransfersHistory.length) {
            alert(`Success, ${currentActionStatusData.tick} was transfered`)

            setRenderActionStatusData((prev) =>
              prev.map((actionData) => {
                if (actionData.tick === currentActionStatusData.tick) {
                  return {
                    ...actionData,
                    status: 'success',
                  }
                }

                return actionData
              })
            )

            localStorage.removeItem('action_status')

            setTimeout(() => {
              setRenderActionStatusData([])
            }, 10000)
          } else {
            if (
              dayjs().diff(dayjs(currentActionStatusData.time), 'minute') >= 3
            ) {
              const updatedActionStatusData: ActionStatusData[] = [
                {
                  tick: currentActionStatusData.tick,
                  type: 'transfer',
                  status: 'failed',
                  current_value: currentActionStatusData.current_value,
                  time: dayjs() as any,
                },
              ]

              setRenderActionStatusData(updatedActionStatusData)

              localStorage.setItem(
                'action_status',
                JSON.stringify(updatedActionStatusData)
              )

              alert(
                `Something went wrong:( Your tokens (${currentActionStatusData.tick}) have not transfered, please, try again`
              )
            } else {
              setTimeout(() => checkTransferValid(), 30 * 1000)
            }
          }

          return
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }, 10000)
  }, [userWalletAddress])

  useEffect(() => {
    const storedActionStatusesData = localStorage.getItem('action_status')

    if (storedActionStatusesData) {
      setRenderActionStatusData(JSON.parse(storedActionStatusesData))

      if (JSON.parse(storedActionStatusesData)[0].type === 'transfer') {
        checkTransferValid()

        return
      }

      if (JSON.parse(storedActionStatusesData)[0].type === 'deploy') {
        checkContractDeployStatus()

        return
      }

      checkBalanceChange()
    }
  }, [checkBalanceChange, checkContractDeployStatus, checkTransferValid])

  const value = useMemo(() => {
    return {
      checkBalanceChange,
      updateRenderActionStatusData: setRenderActionStatusData,
      renderActionStatusData,
      checkTransferValid,
      checkContractDeployStatus,
    }
  }, [
    checkBalanceChange,
    renderActionStatusData,
    checkTransferValid,
    checkContractDeployStatus,
  ])

  return (
    <ActionsStatusContext.Provider value={value}>
      {children}
    </ActionsStatusContext.Provider>
  )
}
