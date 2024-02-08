import {
  FC,
  useCallback,
  useEffect,
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
import { getTokenInfo, getTokenWalletBalance } from 'api'
import { AppRoutes } from 'constants/app'
import { BackButton } from 'features/BackButton'
import { SpecialOffer } from 'features/SpecialOffer'
import { Container } from 'ui/Container/Container'
import { MintForm, ConfirmPopup, MintHistory } from './components'

import { InitialValues } from './components/MintForm/types'
import * as S from './Mint.style'
import { ActionStatusData } from './types'
import { getValidationSchema } from './validationSchema'

export type CurrentConfirmData = {
  messages: SendTransactionRequest['messages']
  fee: string
  tick: string
  balance: number
  interval: number | null
}

export const Mint: FC = () => {
  const [searchParams] = useSearchParams()
  const userWalletAddress = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()
  const navigate = useNavigate()

  //TODO: Доработать, заменив контекст инскрайба на необходимый
  // const {
  //   renderActionStatusData,
  //   updateRenderActionStatusData,
  //   checkBalanceChange,
  // } = useContext(ActionsStatusContext)
  // const actionStatusDictionary = {
  //   failed: 'Failed',
  //   in_progress: 'In Progress',
  //   success: 'Success',
  // } as const

  const [isInscribing, setIsInscribing] = useState<boolean>(false)
  const [currentConfirmData, setCurrentConfirmData] = useState<CurrentConfirmData | null>(null)
  const [intervalFreeze, setIntervalFreeze] = useState<number | null>(null)

  const tickSearchParam = searchParams.get('tick')
  const fromSearchParam = searchParams.get('from')

  useEffect(() => {
    if (intervalFreeze && intervalFreeze > 0) {
      const intervalId = setInterval(() => {
        setIntervalFreeze((prev) => Number(prev) - 1)
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [intervalFreeze])

  const handleFormikSubmit = useCallback<
    FormikConfig<InitialValues>['onSubmit']
  >(async (values, helpers) => {


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

    try {
      setIsInscribing(true)
      const tokenData = await getTokenInfo(values.tick)

      if (tokenData.address) {
        const currentPayload = `data:application/json,{"p":"gram-20","op":"mint","tick":"${values.tick}","repeat":"${values.repeat}","amt":"${values.amount}"}`;

        const currentBody = beginCell()
          .storeUint(zeroOpcode, 32)
          .storeStringTail(currentPayload)
          .endCell()

        if (Number(values.amount) > tokenData.mint_limit) {
          setIsInscribing(false)

          helpers.setFieldError(
            'amount',
            'Amount cannot be more than limit per mint'
          )
          return
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
                  const currentUserBalance =
                    await tonClient.getBalance(Address.parse(userWalletAddress))

                  setCurrentConfirmData({
                    fee: protocolFee.toString(),
                    tick: values.tick,
                    messages: [
                      {
                        address: userContractAddress.toString(),
                        amount: (protocolFee *
                          BigInt(Number(values.repeat)) +
                          toNano('0.008')
                        ).toString(),
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
                } catch (err) {
                  alert('Oops, network error. Please try again')
                } finally {
                  setIsInscribing(false)
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
                        amount: (protocolFee *
                          BigInt(Number(values.repeat)) +
                          toNano('0.008')
                        ).toString(),
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

    return
  },
    [userWalletAddress]
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

        //TODO: Доработать, заменив контекст инскрайба на необходимый
        // updateRenderActionStatusData!(actionStatusData)
        // checkBalanceChange!()


        alert('Your mint application is successfully processed, waiting!')

        if (currentConfirmData.interval) {
          setIntervalFreeze(currentConfirmData.interval)
        }

        setCurrentConfirmData(null)
      }
    } catch (err) {
      setIsInscribing(false)
    }
  }, [
    // checkBalanceChange,
    currentConfirmData,
    tonConnectUI,
    //  updateRenderActionStatusData,
    userWalletAddress])

  return (
    <>
      <HeaderUserBalance />
      <S.Wrapper>
        <BackButton
          onClick={() =>
            fromSearchParam && fromSearchParam === 'start_param'
              ? navigate(AppRoutes.Inscriptions)
              : navigate(-1)
          }
        />
        <Container>
          <Formik
            initialValues={{
              tick: tickSearchParam || '',
              amount: '',
              repeat: '1',
            }}
            onSubmit={handleFormikSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={getValidationSchema()}
          >
            <S.FormWrapper>
              <S.Title children="Mint token with just a click!" />
              <MintForm
                currentConfirmData={currentConfirmData}
                intervalFreeze={intervalFreeze}
                isInscribing={isInscribing}
              />
              {currentConfirmData !== null && (
                <ConfirmPopup
                  fee={currentConfirmData.fee}
                  isLoading={isInscribing}
                  onClose={() => setCurrentConfirmData(null)}
                  onConfirm={signConfirmTransaction}
                  userBalance={currentConfirmData.balance}
                />
              )}
            </S.FormWrapper>
          </Formik>
          <S.StatusBlocks>
            {/* //TODO: Доработать, заменив контекст инскрайба на необходимый */}
            {/* {renderActionStatusData &&
            renderActionStatusData.map(
              ({ tick, status }: ActionStatusData, idx: number) => (
                <S.StatusBlock key={idx}>
                  <S.StatusBlockLabel
                    children={`${tick}: MINT`}
                  />
                  <S.StatusBlockLabel
                    children={actionStatusDictionary[status].toUpperCase()}
                    $status={status}
                  />
                </S.StatusBlock>
              )
            )} */}
          </S.StatusBlocks>
        </Container>
        <SpecialOffer />
        <MintHistory />
      </S.Wrapper>
    </>
  )
}
