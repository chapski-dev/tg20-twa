import { FC, useCallback, useContext, useMemo, useState } from 'react'
import { Address, TonClient, beginCell, fromNano, toNano } from '@ton/ton'
import {
  SendTransactionRequest,
  useTonAddress,
  useTonConnectUI,
} from '@tonconnect/ui-react'
import dayjs from 'dayjs'
import { Formik, FormikConfig } from 'formik'
import { getTokenInfo, getTokenWalletBalance, getTransfersHistory } from 'api'
import { TON_CLIENT_URL } from 'constants/api'
import { buyTonLink, masterAddress } from 'constants/blockchain'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { ActionStatusData } from 'pages/Inscribe/types'
import { ActionsStatusContext } from 'providers/ActionsStatusProvider'
import { Button, Modal } from 'ui'
import { shortenAddress } from 'utils/shortenAddress'
import { TransferPopupForm } from './components'
import * as S from './style'
import { validationSchema } from './validationSchema'

type TransferPopupProps = Partial<InitialValues> & {
  onClose: () => void
  tick: string
}

type InitialValues = {
  amount: string
  address: string
  memo?: string
}

export type CurrentTransferConfirmData = {
  messages: SendTransactionRequest['messages']
  address: string
  tick: string
  balance: number
  amount: string
  interval: number | null
}

const CURRENT_TOTAL_AMOUNT = Number(toNano('0.008')) / 1e9

export const TransferPopup: FC<TransferPopupProps> = (props) => {
  const { onClose, tick, address, amount, memo } = props
  const { checkTransferValid } = useContext(ActionsStatusContext)
  const [tonConnectUI] = useTonConnectUI()
  const userWalletAddress = useTonAddress()
  const { webApp } = useTelegram()
  const [isTransfering, setIsTransfering] = useState<boolean>(false)
  const [currentConfirmData, setCurrentConfirmData] =
    useState<CurrentTransferConfirmData | null>(null)

  const initialValues: InitialValues = useMemo(
    () => ({
      address: address || '',
      amount: amount || '',
      memo: memo || '',
    }),
    [address, amount, memo]
  )

  const handleSubmit = useCallback<FormikConfig<InitialValues>['onSubmit']>(
    async (values, helpers) => {
      try {
        setIsTransfering(true)

        const tonClient = new TonClient({ endpoint: TON_CLIENT_URL })
        const storedMasterAddress = localStorage.getItem('master_address')
        const storedTickData = localStorage.getItem(tick)
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
          localStorage.removeItem(tick)
        }

        const tokenData = await getTokenInfo(tick)

        setTimeout(async () => {
          if (tokenData.address) {
            const transferPayload = `data:application/json,{"p":"gram-20","op":"transfer","tick":"${tick}","amt":"${values.amount}","to":"${values.address}","memo":"${values.memo}"}`

            const currentBody = beginCell()
              .storeUint(0, 32)
              .storeStringTail(transferPayload)
              .endCell()

            console.log('timeout 1')

            try {
              const currentWalletAdddressTokenBalance =
                await getTokenWalletBalance(userWalletAddress, tick)

              if (!Address.isFriendly(values.address)) {
                setIsTransfering(false)
                helpers.setFieldError(
                  'address',
                  'Incorrect wallet address format'
                )
                return
              }

              if (
                Number(values.amount) >
                currentWalletAdddressTokenBalance.balance
              ) {
                setIsTransfering(false)

                helpers.setFieldError(
                  'amount',
                  `Amount cant be more then your ${tick} token balance`
                )

                return
              }
            } catch (err) {
              setIsTransfering(false)
              console.log(err)
            }

            const rootTokenDataResult = await tonClient.runMethod(
              Address.parse(tokenData.address),
              'get_token_data'
            )

            rootTokenDataResult.stack.skip(5)

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

                console.log('timeout 2')

                const userStateInit = userData.stack.readCell()
                const userContractAddress = userData.stack.readAddress()

                setTimeout(async () => {
                  const userState = await tonClient.getContractState(
                    userContractAddress
                  )

                  if (userState.state === 'active') {
                    localStorage.setItem(
                      tick,
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
                        address: values.address,
                        tick: tick,
                        messages: [
                          {
                            address: userContractAddress.toString(),
                            amount: toNano('0.008').toString(),
                            payload: currentBody.toBoc().toString('base64'),
                            stateInit:
                              userState.state !== 'active'
                                ? userStateInit.toBoc().toString('base64')
                                : undefined,
                          },
                        ],
                        balance: Number(fromNano(currentUserBalance)),
                        interval: null,
                        amount: values.amount,
                      })

                      setIsTransfering(false)
                    } catch (err) {
                      setIsTransfering(false)
                      alert('Oops, network error. Please try again 1')
                    }
                  }, 1000)
                }, 1000)

                setIsTransfering(false)
                return
              }
            }, 1000)

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
                    `Please, wait ${timeToWaitInSeconds} seconds, and try to mint again.`
                  )
                  setIsTransfering(false)
                  return
                }

                setTimeout(async () => {
                  try {
                    const currentUserBalance = await tonClient.getBalance(
                      Address.parse(userWalletAddress)
                    )

                    setCurrentConfirmData({
                      address: values.address,
                      tick: tick,
                      messages: [
                        {
                          address: storedUserContractAddress,
                          amount: toNano('0.008').toString(),
                          payload: currentBody.toBoc().toString('base64'),
                        },
                      ],
                      balance: Number(fromNano(currentUserBalance)),
                      interval,
                      amount: values.amount,
                    })
                  } catch (err) {
                    setIsTransfering(false)
                    alert('Oops, network error. Please try again 2')
                  }

                  setIsTransfering(false)
                }, 1000)
              } catch (error) {
                setIsTransfering(false)
                alert('Oops, network error. Please try again 3')
              }
            }, 1000)

            return
          }

          alert(`Oops, that token doesn't exist`)
          setIsTransfering(false)
        }, 1000)
      } catch (error) {
        setIsTransfering(false)
      }
    },
    [tick, userWalletAddress]
  )

  const handleBuyTonClick = () => {
    webApp?.disableClosingConfirmation()
    window.open(buyTonLink, '_blank')
    onClose()
  }

  const signTransferTransaction = useCallback(async () => {
    if (!currentConfirmData) {
      return null
    }

    try {
      setIsTransfering(true)

      const trx = await tonConnectUI.sendTransaction(
        {
          validUntil: Math.floor(Date.now() / 1000) + 180,
          messages: currentConfirmData.messages,
        },
        { returnStrategy: 'none' }
      )

      if (trx.boc) {
        setIsTransfering(false)

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

        localStorage.setItem('action_status', JSON.stringify(actionStatusData))

        if (checkTransferValid) {
          checkTransferValid()
        }

        alert(`Your transfer application is successfully processed, waiting!`)
        setCurrentConfirmData(null)
        onClose()
      }
    } catch (err) {
      setIsTransfering(false)
    }
  }, [
    checkTransferValid,
    currentConfirmData,
    tonConnectUI,
    userWalletAddress,
    onClose,
  ])

  return (
    <Modal onClose={onClose} title="Send">
      {currentConfirmData ? (
        <S.ConfirmBlockWrapper>
          <S.ConfirmFieldsWrapper>
            <S.ConfirmFieldWrapper>
              <S.Label children="TICK:" />
              <S.ValueLabel children={tick} />
            </S.ConfirmFieldWrapper>

            <S.Line />

            <S.ConfirmFieldWrapper>
              <S.Label children="TO:" />
              <S.ValueLabel
                children={shortenAddress(currentConfirmData.address)}
              />
            </S.ConfirmFieldWrapper>

            <S.Line />

            <S.ConfirmFieldWrapper>
              <S.Label children="AMOUNT" />
              <S.ValueLabel children={currentConfirmData.amount} />
            </S.ConfirmFieldWrapper>
          </S.ConfirmFieldsWrapper>

          <S.ConfirmFieldsWrapper>
            <S.ConfirmFieldWrapper>
              <S.Label children="TOTAL AMOUNT:" />
              <S.ValueLabel
                children={`${(Number(toNano('0.008')) / 1e9).toString()} TON`}
              />
            </S.ConfirmFieldWrapper>
          </S.ConfirmFieldsWrapper>

          <Button
            children={
              CURRENT_TOTAL_AMOUNT > currentConfirmData.balance
                ? 'Buy TON'
                : 'Confirm transfer'
            }
            isLoading={isTransfering}
            onClick={
              CURRENT_TOTAL_AMOUNT > currentConfirmData.balance
                ? handleBuyTonClick
                : signTransferTransaction
            }
          />
        </S.ConfirmBlockWrapper>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnBlur={true}
          validateOnChange={true}
          validationSchema={validationSchema}
        >
          <TransferPopupForm isTransfering={isTransfering} />
        </Formik>
      )}
    </Modal>
  )
}
