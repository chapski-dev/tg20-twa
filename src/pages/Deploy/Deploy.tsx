import {
  FC,
  useCallback,
  useContext,
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
import { TON_CLIENT_URL } from 'constants/api'
import { AppRoutes } from 'constants/app'
import { BackButton } from 'features/BackButton'
import { HeaderUserBalance } from 'features/HeaderUserBalance'
import { ActionsStatusContext } from 'providers/ActionsStatusProvider'
import { Promo } from 'ui/Promo'
import { DeployForm } from './components'
import { type InitialValues } from './components/DeployForm/types'
import * as S from './style'
import { ActionStatusData } from './types'
import { getValidationSchema } from './validationSchema'

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
  const {
    renderActionStatusData,
    updateRenderActionStatusData,
    checkContractDeployStatus,
  } = useContext(ActionsStatusContext)

  const [loading, setLoading] = useState<boolean>(false)
  const [currentConfirmData, setCurrentConfirmData] = useState<CurrentConfirmData | null>(null)
  const [intervalFreeze, setIntervalFreeze] = useState(0)
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

  const initialState: InitialValues = {
    tick: '',
    amount: '',
    limit: '',
    premintAmount: '0',
    interval: '15',
    penalty: '15',
    file: '',
  }

  const handleFormikSubmit = useCallback<FormikConfig<InitialValues>['onSubmit']>(async (values) => {
    if (!userWalletAddress) {
      tonConnectUI.openModal()
      return;
    }

    const tonClient = new TonClient({ endpoint: TON_CLIENT_URL })
    const zeroOpcode = 0
    const masterAddress = 'EQBoPPFXQpGIiXQNkJ8DpQANN_OmMimp5dx6lWjRZmvEgZCI'
    const storedMasterAddress = localStorage.getItem('master_address')
    const storedTickData = localStorage.getItem(values.tick.toString())
    const parsedStoredTickData = storedTickData &&
      storedTickData.includes('userContractAddress') &&
      JSON.parse(storedTickData)

    const storedUserContractAddress = parsedStoredTickData?.userContractAddress

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

  }, [tonConnectUI, userWalletAddress]);

  const signConfirmTransaction = useCallback(async () => {
    if (!currentConfirmData) {
      return;
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

        if (currentConfirmData.interval) {
          setIntervalFreeze(currentConfirmData.interval)
        }

        setCurrentConfirmData(null)
      }
    } catch (err) {
      setLoading(false)
    }
  }, [checkContractDeployStatus, currentConfirmData, tonConnectUI, updateRenderActionStatusData])


  return (
    <S.Wrapper>
      <HeaderUserBalance />
      <BackButton
        onClick={() => fromSearchParam === 'start_param' ? navigate(AppRoutes.Home) : navigate(-1)}
      />
      <S.Container>
        <S.Title children="Deploy your own token with ease!" />
        <Formik
          initialValues={initialState}
          onSubmit={handleFormikSubmit}
          validateOnBlur={true}
          validateOnChange={true}
          validationSchema={getValidationSchema()}
        >
          <DeployForm
            currentConfirmData={currentConfirmData}
            intervalFreeze={intervalFreeze}
            loading={loading}
            setCurrentConfirmData={setCurrentConfirmData}
            signConfirmTransaction={signConfirmTransaction}
          />
        </Formik>
        <S.StatusBlocks>
          {renderActionStatusData?.map((el, i: number) => (
            <S.StatusBlock key={i}>
              <S.StatusBlockLabel children={`${el.tick}: ${el.type.toUpperCase()}`} />
              <S.StatusBlockLabel
                children={actionStatusDictionary[el.status].toUpperCase()}
                $status={el.status}
              />
            </S.StatusBlock>
          ))}
        </S.StatusBlocks>
      </S.Container>
      <S.PromoWrapper>
        <Promo
          className="promo"
          subtitle="Explore Wallet"
          title="See what's new in your wallet"
          variant="purple"
        />
      </S.PromoWrapper>
    </S.Wrapper>
  )
}
