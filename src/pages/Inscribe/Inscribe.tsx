import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Address, TonClient, beginCell, fromNano, toNano } from '@ton/ton'
import {
  useTonAddress,
  useTonConnectUI,
  SendTransactionRequest,
} from '@tonconnect/ui-react'
import dayjs from 'dayjs'
import { Formik, FormikConfig } from 'formik'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getTokenInfo, getTokenWalletBalance, getTransfersHistory } from 'api'
import { AppRoutes } from 'constants/app'
import { BackButton } from 'features/BackButton'
import { MainButton } from 'features/MainButton'
import { ActionsStatusContext } from 'providers/ActionsStatusProvider'
import { Container } from 'ui/Container/Container'
import { Tab, TabsFilled } from 'ui/TabsFilled/TabsFilled'
import { InscribeForm, ConfirmPopup } from './components'
import { type InitialValues } from './components/InscribeForm/types'
import * as S from './style'
import { ActionStatusData, InscribeFormType } from './types'
import { getValidationSchema } from './validationSchema'

type TCurrentConfirmData = {
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

export const Inscribe: FC = () => {
  const [searchParams] = useSearchParams()

  const {
    renderActionStatusData,
    updateRenderActionStatusData,
    checkBalanceChange,
    checkTransferValid,
    checkContractDeployStatus,
  } = useContext(ActionsStatusContext)

  const [isInscribing, setIsInscribing] = useState<boolean>(false)

  const [currentConfirmData, setCurrentConfirmData] =
    useState<TCurrentConfirmData | null>(null)

  const [intervalFreeze, setIntervalFreeze] = useState<number | null>(null)

  const tickSearchParam = searchParams.get('tick')

  const fromSearchParam = searchParams.get('from')

  const formTypeSearchParam = searchParams.get('type')

  useEffect(() => {
    if (intervalFreeze && intervalFreeze > 0) {
      const intervalId = setInterval(() => {
        setIntervalFreeze((prev) => Number(prev) - 1)
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [intervalFreeze])

  const tabs: Tab[] = useMemo(() => {
    if (fromSearchParam === 'home' || fromSearchParam === 'wallet') {
      return [
        {
          label: 'Mint',
          value: 'mint',
        },
        {
          label: 'Deploy',
          value: 'deploy',
        },
        {
          label: 'Transfer',
          value: 'transfer',
        },
      ]
    }

    if (formTypeSearchParam === 'transfer' && fromSearchParam === 'token') {
      return [
        {
          label: 'Transfer',
          value: 'transfer',
        },
      ]
    }

    return [
      {
        label: 'Mint',
        value: 'mint',
      },

      {
        label: 'Transfer',
        value: 'transfer',
      },
    ]
  }, [formTypeSearchParam, fromSearchParam])

  const getInitialSelectedTab = () => {
    if (formTypeSearchParam) {
      const currentTab = tabs.find(({ value }) => value === formTypeSearchParam)

      return currentTab || tabs[0]
    }

    return tabs[0]
  }

  const [selectedTab, setSelectedTab] = useState<Tab>(() =>
    getInitialSelectedTab()
  )

  const userWalletAddress = useTonAddress()

  const [tonConnectUI] = useTonConnectUI()

  const navigate = useNavigate()

  const getInitialValues = (): InitialValues => {
    switch (selectedTab.value as InscribeFormType) {
      case 'mint':
        return {
          tick: tickSearchParam || '',
          amount: '',
          repeat: '1',
        }
      case 'deploy':
        return {
          tick: '',
          amount: '',
          limit: '',
          premintAmount: '0',
          interval: '15',
          penalty: '15',
        }
      case 'transfer':
        return {
          tick: tickSearchParam || '',
          to: '',
          amount: '',
          memo: '',
        }
    }
  }

  const handleTabChange = useCallback((tab: Tab, resetForm: () => void) => {
    setSelectedTab(tab)
    resetForm()
  }, [])

  const handleFormikSubmit = useCallback<
    FormikConfig<InitialValues>['onSubmit']
  >(
    async (values, helpers) => {
      const tonClient = new TonClient({
        endpoint: 'https://toncenter-v4.gram20.com/jsonRPC',
      })

      const zeroOpcode = 0

      const masterAddress = 'EQBoPPFXQpGIiXQNkJ8DpQANN_OmMimp5dx6lWjRZmvEgZCI'

      const storedMasterAddress = localStorage.getItem('master_address')

      const storedTickData = localStorage.getItem(values.tick.toString())

      const parsedStoredTickData =
        storedTickData &&
        storedTickData.includes('userContractAddress') &&
        JSON.parse(storedTickData)

      const storedUserContractAddress =
        parsedStoredTickData?.userContractAddress

      if (
        (storedMasterAddress && storedMasterAddress !== masterAddress) ||
        storedMasterAddress === null ||
        parsedStoredTickData?.userWalletAddress !== userWalletAddress ||
        !storedUserContractAddress
      ) {
        localStorage.removeItem(values.tick.toString())
      }

      switch (selectedTab.value) {
        case 'deploy':
          setIsInscribing(true)

          // if (Number(values.amount) / Number(values.limit) < 4000000) {
          //   setIsInscribing(false)

          //   helpers.setFieldError(
          //     'limit',
          //     'The ratio of total supply to limit per mint should not be greater than 4.000.000'
          //   )

          //   return
          // }

          const deployPayload = `data:application/json,{"p":"gram-20","op":"deploy","tick":"${values.tick}","max":"${values.amount}","limit":"${values.limit}","start":"0","interval":"10","penalty":"10"}`

          setTimeout(async () => {
            try {
              const currentUserBalance = await tonClient.getBalance(
                Address.parse(userWalletAddress)
              )

              const tokenDeployBody = beginCell()
                .storeUint(zeroOpcode, 32)
                .storeStringTail(deployPayload)
                .endCell()

              setCurrentConfirmData({
                fee: '0',
                tick: values.tick,
                messages: [
                  {
                    address: masterAddress,
                    amount: toNano('0.1').toString(),
                    payload: tokenDeployBody.toBoc().toString('base64'),
                  },
                ],
                balance: Number(fromNano(currentUserBalance)),
                interval: null,
              })

              setIsInscribing(false)
            } catch (err) {
              setIsInscribing(false)

              console.log(err)
            }
          }, 1000)

          break
        //MINT | TRANSFER
        case 'mint':
        case 'transfer':
          try {
            setIsInscribing(true)
            const tokenData = await getTokenInfo(values.tick)

            if (tokenData.address) {
              const currentPayload =
                selectedTab.value === 'mint'
                  ? `data:application/json,{"p":"gram-20","op":"mint","tick":"${values.tick}","repeat":"${values.repeat}","amt":"${values.amount}"}`
                  : selectedTab.value === 'transfer'
                  ? `data:application/json,{"p":"gram-20","op":"transfer","tick":"${values.tick}","amt":"${values.amount}","to":"${values.to}","memo":"${values.memo}"}`
                  : ''

              const currentBody = beginCell()
                .storeUint(zeroOpcode, 32)
                .storeStringTail(currentPayload)
                .endCell()

              if (
                selectedTab.value === 'mint' &&
                Number(values.amount) > tokenData.mint_limit
              ) {
                setIsInscribing(false)

                helpers.setFieldError(
                  'amount',
                  'Amount cannot be more than limit per mint'
                )

                return
              }

              if (selectedTab.value === 'transfer') {
                try {
                  const currentWalletAdddressTokenBalance =
                    await getTokenWalletBalance(userWalletAddress, values.tick)

                  if (!Address.isFriendly(values.to!)) {
                    setIsInscribing(false)

                    helpers.setFieldError(
                      'to',
                      'Incorrect wallet address format'
                    )

                    return
                  }

                  if (
                    Number(values.amount) >
                    currentWalletAdddressTokenBalance.balance
                  ) {
                    setIsInscribing(false)

                    helpers.setFieldError(
                      'amount',
                      `Amount cant be more then your ${values.tick} token balance`
                    )

                    return
                  }
                } catch (err) {
                  setIsInscribing(false)
                  console.log(err)
                }
              }

              const rootTokenDataResult = await tonClient.runMethod(
                Address.parse(tokenData.address),
                'get_token_data'
              )

              rootTokenDataResult.stack.skip(5)

              const protocolFee = rootTokenDataResult.stack.readBigNumber()

              setTimeout(async () => {
                if (!storedUserContractAddress) {
                  const userData = await tonClient.runMethod(
                    Address.parse(tokenData.address),
                    'get_user_data',
                    [
                      {
                        type: 'slice',
                        cell: beginCell()
                          .storeAddress(Address.parse(userWalletAddress))
                          .endCell(),
                      },
                    ]
                  )

                  const userStateInit = userData.stack.readCell()
                  const userContractAddress = userData.stack.readAddress()

                  setTimeout(async () => {
                    const userState = await tonClient.getContractState(
                      userContractAddress
                    )

                    if (userState.state === 'active') {
                      localStorage.setItem(
                        values.tick.toString(),
                        JSON.stringify({
                          userContractAddress: userContractAddress.toString(),
                          userWalletAddress: userWalletAddress.toString(),
                        })
                      )

                      localStorage.setItem('master_address', masterAddress)
                    }

                    setTimeout(async () => {
                      try {
                        const currentUserBalance = await tonClient.getBalance(
                          Address.parse(userWalletAddress)
                        )
                        setCurrentConfirmData({
                          fee: protocolFee.toString(),
                          tick: values.tick,
                          messages: [
                            {
                              address: userContractAddress.toString(),
                              amount:
                                selectedTab.value === 'mint'
                                  ? (
                                      protocolFee *
                                        BigInt(Number(values.repeat)) +
                                      toNano('0.008')
                                    ).toString()
                                  : toNano('0.008').toString(),
                              payload: currentBody.toBoc().toString('base64'),
                              stateInit:
                                userState.state !== 'active'
                                  ? userStateInit.toBoc().toString('base64')
                                  : undefined,
                            },
                          ],
                          balance: Number(fromNano(currentUserBalance)),
                          interval: null,
                        })

                        setIsInscribing(false)
                      } catch (err) {
                        setIsInscribing(false)
                        alert('Oops, network error. Please try again')
                      }
                    }, 1000)
                  }, 1000)

                  return
                }

                setTimeout(async () => {
                  try {
                    const userContractResult = await tonClient.runMethod(
                      Address.parse(storedUserContractAddress),
                      'get_user_data'
                    )

                    userContractResult.stack.skip(2)

                    const lastMinted = userContractResult.stack.readNumber()
                    const interval = userContractResult.stack.readNumber()

                    const currentTime = Date.now()

                    const isCanMint =
                      lastMinted * 1000 + interval > currentTime ? false : true

                    if (!isCanMint) {
                      const timeToWaitInSeconds =
                        lastMinted + interval - currentTime

                      alert(
                        `Please, wait ${timeToWaitInSeconds} seconds, and try to mint again. `
                      )

                      setIsInscribing(false)

                      return
                    }

                    setTimeout(async () => {
                      try {
                        const currentUserBalance = await tonClient.getBalance(
                          Address.parse(userWalletAddress)
                        )

                        setCurrentConfirmData({
                          fee: protocolFee.toString(),
                          tick: values.tick,
                          messages: [
                            {
                              address: storedUserContractAddress,
                              amount:
                                selectedTab.value === 'mint'
                                  ? (
                                      protocolFee *
                                        BigInt(Number(values.repeat)) +
                                      toNano('0.008')
                                    ).toString()
                                  : toNano('0.008').toString(),
                              payload: currentBody.toBoc().toString('base64'),
                            },
                          ],
                          balance: Number(fromNano(currentUserBalance)),
                          interval,
                        })
                      } catch (err) {
                        setIsInscribing(false)
                        alert('Oops, network error. Please try again')
                      }

                      setIsInscribing(false)
                    }, 1000)
                  } catch (error) {
                    setIsInscribing(false)
                    alert('Oops, network error. Please try again')
                  }
                }, 1000)
              }, 1000)

              return
            }
          } catch (err) {
            setIsInscribing(false)
            alert('Oops, network error. Please try again')

            console.log(err)
          }

          break
      }

      return
    },
    [selectedTab, userWalletAddress]
  )

  const signConfirmTransaction = useCallback(async () => {
    if (!currentConfirmData) {
      return null
    }

    try {
      setIsInscribing(true)

      const trx = await tonConnectUI.sendTransaction(
        {
          validUntil: Math.floor(Date.now() / 1000) + 180,
          messages: currentConfirmData.messages,
        },
        {
          returnStrategy: 'none',
        }
      )

      if (trx.boc) {
        setIsInscribing(false)

        if (selectedTab.value === 'deploy') {
          const actionStatusData: ActionStatusData[] = [
            {
              tick: currentConfirmData.tick,
              type: 'deploy',
              status: 'in_progress',
              current_value: '',
              time: dayjs() as any,
            },
          ]

          localStorage.setItem(
            'action_status',
            JSON.stringify(actionStatusData)
          )
          updateRenderActionStatusData!(actionStatusData)

          checkContractDeployStatus!()
        }

        if (selectedTab.value === 'mint') {
          const currentWalletAdddressTokenBalance = await getTokenWalletBalance(
            userWalletAddress,
            currentConfirmData.tick
          )

          const actionStatusData: ActionStatusData[] = [
            {
              tick: currentConfirmData.tick,
              type: 'mint',
              status: 'in_progress',
              current_value: currentWalletAdddressTokenBalance
                ? currentWalletAdddressTokenBalance.balance.toString()
                : '0',
              time: dayjs() as any,
            },
          ]

          localStorage.setItem(
            'action_status',
            JSON.stringify(actionStatusData)
          )

          updateRenderActionStatusData!(actionStatusData)

          checkBalanceChange!()
        }

        if (selectedTab.value === 'transfer') {
          const currentUserTransfers = await getTransfersHistory(
            userWalletAddress
          )

          const actionStatusData: ActionStatusData[] = [
            {
              tick: currentConfirmData.tick,
              type: 'transfer',
              status: 'in_progress',
              current_value: JSON.stringify(currentUserTransfers),
              time: dayjs() as any,
            },
          ]

          localStorage.setItem(
            'action_status',
            JSON.stringify(actionStatusData)
          )
          updateRenderActionStatusData!(actionStatusData)

          checkTransferValid!()
        }

        alert(
          `Your ${selectedTab.value} application is successfully processed, waiting!`
        )

        if (currentConfirmData.interval) {
          setIntervalFreeze(currentConfirmData.interval)
        }

        setCurrentConfirmData(null)
      }
    } catch (err) {
      setIsInscribing(false)
    }
  }, [
    checkBalanceChange,
    checkContractDeployStatus,
    checkTransferValid,
    currentConfirmData,
    selectedTab.value,
    tonConnectUI,
    updateRenderActionStatusData,
    userWalletAddress,
  ])

  const currentMainButtonName = useMemo(() => {
    switch (true) {
      case !userWalletAddress:
        return 'Connect Wallet'
      case intervalFreeze !== null && intervalFreeze > 0:
        return `Repeat ${selectedTab.label} after ${intervalFreeze} seconds...`
      default:
        return selectedTab.label
    }
  }, [intervalFreeze, selectedTab.label, userWalletAddress])

  return (
    <S.Wrapper>
      <BackButton
        onClick={() =>
          fromSearchParam && fromSearchParam === 'start_param'
            ? navigate(AppRoutes.Home)
            : navigate(-1)
        }
      />
      <Container>
        <Formik
          initialValues={getInitialValues()}
          onSubmit={handleFormikSubmit}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={getValidationSchema(selectedTab.value as InscribeFormType)}
        >
          {({ resetForm, handleSubmit }) => (
            <S.FormWrapper>
              <TabsFilled
                onChange={(tab) => {
                  handleTabChange(tab, resetForm)
                }}
                selectedTab={selectedTab}
                tabs={tabs}
              />
              <InscribeForm type={selectedTab.value as InscribeFormType} />
              {!currentConfirmData && (
                <MainButton
                  disabled={intervalFreeze !== null && intervalFreeze > 0}
                  onClick={
                    !userWalletAddress
                      ? () => tonConnectUI.openModal()
                      : handleSubmit
                  }
                  progress={isInscribing}
                  text={currentMainButtonName}
                />
              )}
              {currentConfirmData !== null && (
                <ConfirmPopup
                  fee={currentConfirmData.fee}
                  formType={selectedTab.value as InscribeFormType}
                  isLoading={isInscribing}
                  onClose={() => setCurrentConfirmData(null)}
                  onConfirm={signConfirmTransaction}
                  userBalance={currentConfirmData.balance}
                />
              )}
            </S.FormWrapper>
          )}
        </Formik>
        <S.StatusBlocks>
          {renderActionStatusData &&
            renderActionStatusData.map(
              ({ tick, status, type }: ActionStatusData, idx: number) => (
                <S.StatusBlock key={idx}>
                  <S.StatusBlockLabel>
                    {tick}: {type.toUpperCase()}
                  </S.StatusBlockLabel>
                  <S.StatusBlockLabel $status={status}>
                    {actionStatusDictionary[status].toUpperCase()}
                  </S.StatusBlockLabel>
                </S.StatusBlock>
              )
            )}
        </S.StatusBlocks>
      </Container>
    </S.Wrapper>
  )
}
