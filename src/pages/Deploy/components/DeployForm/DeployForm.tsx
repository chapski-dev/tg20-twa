import { FC, useCallback, useMemo, useState } from 'react'
import { Address, TonClient, beginCell, fromNano, toNano } from '@ton/ton'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { Formik, FormikConfig } from 'formik'
import { getTokenInfo } from 'api'
import { TON_CLIENT_URL } from 'constants/api'
import { CurrentConfirmData } from 'pages/Deploy/Deploy'
import { getValidationSchema } from 'pages/Deploy/validationSchema'
import { Button } from 'ui'
import Stepper from 'ui/Stepper/Stepper'
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
      case loading:
        return 'Waiting for deploying'
      default:
        return 'Deploy'
    }
  }, [currentDeployStep, intervalFreeze, loading, userWalletAddress])

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
      if (!userWalletAddress) {
        tonConnectUI.openModal()
        return
      }

      setLoading(true)

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

      const currentDeployData: Record<
        number,
        { payload: string; amount: string }
      > = {
        1: {
          payload: `data:application/json,{"p":"gram-20","op":"deploy","tick":"${values.tick}","max":"${values.amount}","limit":"${values.limit}","start":"0","interval":"10","penalty":"10"}`,
          amount: '0.1',
        },
        2: {
          payload: `data:application/json,{"p":"gram-20","op":"metadata","tick":"${
            values.tick
          }","image":"${values.file.substring(
            'data:image/png;base64,'.length
          )}"}`,
          amount: '0.05',
        },
      }

      setTimeout(async () => {
        try {
          const currentUserBalance = await tonClient.getBalance(
            Address.parse(userWalletAddress)
          )

          const tokenDeployBody = beginCell()
            .storeUint(zeroOpcode, 32)
            .storeStringTail(currentDeployData[currentDeployStep].payload)
            .endCell()

          setCurrentConfirmData({
            fee: currentDeployData[currentDeployStep].amount,
            tick: values.tick,
            messages: [
              {
                address: masterAddress,
                amount: toNano(
                  currentDeployData[currentDeployStep].amount
                ).toString(),
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
        if (currentDeployStep === 1) {
          setCurrentConfirmData(null)

          let attempts = 0

          const interval = setInterval(async () => {
            attempts++

            const currentTickData = await getTokenInfo(currentConfirmData.tick)

            if (Boolean(currentTickData?.address) || attempts >= 8) {
              clearInterval(interval)
              if (Boolean(currentTickData?.address)) {
                setCurrentDeployStep((prev) => prev + 1)

                setLoading(false)
              } else {
                setLoading(false)

                alert(
                  `Oops, something went wrong. Try to update your token metadata later.`
                )
              }
            }
          }, 10000)

          return
        }

        alert('Your image successfully uploaded!')
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
    }
  }, [
    currentConfirmData,
    currentDeployStep,
    setCurrentConfirmData,
    tonConnectUI,
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
          <Stepper step={currentDeployStep - 1} totalSteps={2} />

          <S.Wrapper>{currentDeployStepForm}</S.Wrapper>

          {!currentConfirmData && (
            <Button
              children={buttonText}
              className="button"
              isDisabled={intervalFreeze !== null && intervalFreeze > 0}
              isLoading={loading}
              onClick={
                userWalletAddress
                  ? () => handleSubmit()
                  : () => tonConnectUI.openModal()
              }
            />
          )}
          {currentConfirmData !== null && (
            <ConfirmPopup
              fee={currentConfirmData.fee}
              isLoading={loading}
              onClose={() => setCurrentConfirmData(null)}
              onConfirm={signConfirmTransaction}
              type={currentDeployStep === 1 ? 'deploy' : 'metadata'}
              userBalance={currentConfirmData.balance}
            />
          )}
        </S.FormWrapper>
      )}
    </Formik>
  )
}
