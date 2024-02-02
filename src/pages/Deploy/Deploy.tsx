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
import { AppRoutes } from 'constants/app'
import { BackButton } from 'features/BackButton'
import { MainButton } from 'features/MainButton'
import { ActionsStatusContext } from 'providers/ActionsStatusProvider'
import { Button } from 'ui/Button/Button'
import { Container } from 'ui/Container/Container'
import { Promo } from 'ui/Promo'
import { InscribeForm, ConfirmPopup } from './components'
import { type InitialValues } from './components/InscribeForm/types'
import * as S from './style'
import { ActionStatusData } from './types'
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

export const Deploy: FC = () => {
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

  const fromSearchParam = searchParams.get('from')

  useEffect(() => {
    if (intervalFreeze && intervalFreeze > 0) {
      const intervalId = setInterval(() => {
        setIntervalFreeze((prev) => Number(prev) - 1)
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [intervalFreeze])

  const userWalletAddress = useTonAddress()

  const [tonConnectUI] = useTonConnectUI()

  const navigate = useNavigate()

  const getInitialValues = (): InitialValues => {
    return {
      tick: '',
      amount: '',
      limit: '',
      premintAmount: '0',
      interval: '15',
      penalty: '15',
      file: '',
    }
  }

  const handleFormikSubmit = useCallback<
    FormikConfig<InitialValues>['onSubmit']
  >(
    async (values) => {
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

      setIsInscribing(true)
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
        const actionStatusData: ActionStatusData[] = [
          {
            tick: currentConfirmData.tick,
            type: 'deploy',
            status: 'in_progress',
            current_value: '',
            time: dayjs() as any,
          },
        ]

        localStorage.setItem('action_status', JSON.stringify(actionStatusData))
        updateRenderActionStatusData!(actionStatusData)

        checkContractDeployStatus!()

        alert(`Your Deploy application is successfully processed, waiting!`)

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
    tonConnectUI,
    updateRenderActionStatusData,
    userWalletAddress,
  ])

  const currentMainButtonName = useMemo(() => {
    switch (true) {
      case !userWalletAddress:
        return 'Connect Wallet'
      case intervalFreeze !== null && intervalFreeze > 0:
        return `Repeat Deploy after ${intervalFreeze} seconds...`
      default:
        return 'Deploy'
    }
  }, [intervalFreeze, userWalletAddress])

  return (
    <>
      <S.Wrapper>
        <BackButton
          onClick={() =>
            fromSearchParam && fromSearchParam === 'start_param'
              ? navigate(AppRoutes.Home)
              : navigate(-1)
          }
        />
        <S.Container>
          <S.TitleDeploy>Deploy your own token with ease!</S.TitleDeploy>
          <Formik
            initialValues={getInitialValues()}
            onSubmit={handleFormikSubmit}
            validateOnBlur={false}
            validateOnChange={true}
            validationSchema={getValidationSchema()}
          >
            {({ handleSubmit }) => (
              <S.FormWrapper>
                <InscribeForm />
                {!currentConfirmData && (
                  <Button
                    className="button"
                    isDisabled={intervalFreeze !== null && intervalFreeze > 0}
                    isLoading={isInscribing}
                    onClick={
                      !userWalletAddress
                        ? () => tonConnectUI.openModal()
                        : handleSubmit
                    }
                  >
                    {currentMainButtonName}
                  </Button>
                )}
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
        </S.Container>
      </S.Wrapper>
      <S.PromoWrapper>
        <Promo
          className="promo"
          subtitle="Explore Wallet"
          title="See what's new in your wallet"
          variant="purple"
        />
      </S.PromoWrapper>
    </>
  )
}
