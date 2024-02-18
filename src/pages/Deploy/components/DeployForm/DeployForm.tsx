import { FC, useCallback, useContext, useMemo, useState } from 'react'
import { Address, TonClient, beginCell, fromNano, toNano } from '@ton/ton'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import dayjs from 'dayjs'
import { Formik, FormikConfig } from 'formik'
import { TON_CLIENT_URL } from 'constants/api'
import { CurrentConfirmData } from 'pages/Deploy/Deploy'
import { getValidationSchema } from 'pages/Deploy/validationSchema'
import { ActionStatusData } from 'pages/Inscribe/types'
import { ActionsStatusContext } from 'providers/ActionsStatusProvider'
import { Button } from 'ui'
import { DeployStep1, DeployStep2 } from './components'
import * as S from './style'
import { InitialValues } from './types'
import { ConfirmPopup } from '../ConfirmPopup/ConfirmPopup'

type DeployFormProps = {
  currentConfirmData: CurrentConfirmData | null
  intervalFreeze: number
  setCurrentConfirmData: React.Dispatch<
    React.SetStateAction<CurrentConfirmData | null>
  >
}

export const DeployForm: FC<DeployFormProps> = (props) => {
  const { currentConfirmData, intervalFreeze, setCurrentConfirmData } = props

  const { updateRenderActionStatusData, checkContractDeployStatus } =
    useContext(ActionsStatusContext)

  const [loading, setLoading] = useState<boolean>(false)

  const [currentDeployStep, setCurrentDeployStep] = useState<number>(1)

  const userWalletAddress = useTonAddress()

  const [tonConnectUI] = useTonConnectUI()

  const initialValues: InitialValues = {
    tick: '',
    amount: '',
    limit: '',
    premintAmount: '0',
    interval: '15',
    penalty: '15',
    file: '',
  }

  const buttonText = useMemo(() => {
    switch (true) {
      case !userWalletAddress:
        return 'Connect Wallet'
      case intervalFreeze !== null && intervalFreeze > 0:
        return `Repeat Deploy after ${intervalFreeze} seconds...`
      case currentDeployStep === 1:
        return 'Continue'
      default:
        return 'Deploy'
    }
  }, [currentDeployStep, intervalFreeze, userWalletAddress])

  const currentDeployStepForm = useMemo(() => {
    if (currentDeployStep === 1) {
      return <DeployStep1 />
    }

    return <DeployStep2 />
  }, [currentDeployStep])

  const handleFormikSubmit = useCallback<
    FormikConfig<InitialValues>['onSubmit']
  >(
    async (values) => {
      if (currentDeployStep === 1) {
        setCurrentDeployStep((prev) => prev + 1)
        return
      }

      if (!userWalletAddress) {
        tonConnectUI.openModal()
        return
      }

      const tonClient = new TonClient({ endpoint: TON_CLIENT_URL })
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

      setLoading(true)

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

          setLoading(false)
        } catch (err) {
          setLoading(false)

          console.log(err)
        }
      }, 1000)
    },
    [currentDeployStep, setCurrentConfirmData, tonConnectUI, userWalletAddress]
  )

  const signConfirmTransaction = useCallback(async () => {
    if (!currentConfirmData) {
      return
    }

    try {
      setLoading(true)
      const trx = await tonConnectUI.sendTransaction(
        {
          validUntil: Math.floor(Date.now() / 1000) + 180,
          messages: currentConfirmData.messages,
        },
        { returnStrategy: 'none' }
      )

      if (trx.boc) {
        setLoading(false)
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

        setCurrentConfirmData(null)
      }
    } catch (err) {
      setLoading(false)
    }
  }, [
    checkContractDeployStatus,
    currentConfirmData,
    setCurrentConfirmData,
    tonConnectUI,
    updateRenderActionStatusData,
  ])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormikSubmit}
      validateOnBlur={true}
      validateOnChange={true}
      validationSchema={getValidationSchema()}
    >
      {({ handleSubmit }) => (
        <S.FormWrapper>
          <S.Wrapper>{currentDeployStepForm}</S.Wrapper>

          {!currentConfirmData && (
            <Button
              children={buttonText}
              className="button"
              isDisabled={intervalFreeze !== null && intervalFreeze > 0}
              isLoading={loading}
              onClick={handleSubmit}
            />
          )}
          {currentConfirmData !== null && (
            <ConfirmPopup
              fee={currentConfirmData.fee}
              isLoading={loading}
              onClose={() => setCurrentConfirmData(null)}
              onConfirm={signConfirmTransaction}
              userBalance={currentConfirmData.balance}
            />
          )}
        </S.FormWrapper>
      )}
    </Formik>
  )
}
