import React, { FC, useCallback, useMemo, useState } from 'react'
import {
  Address,
  Cell,
  TonClient,
  TupleItem,
  TupleReader,
  beginCell,
  contractAddress,
  toNano,
} from '@ton/ton'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { Formik, FormikConfig } from 'formik'
import { getTokenInfo } from 'api'
import { TON_CLIENT_URL } from 'constants/api'
import { MainButton } from 'features/MainButton'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { RequestTimoutPopup } from 'ui'
import { Modal } from 'ui/Modal/Modal'
import * as S from './style'
import { validationSchema } from './validationSchema'
const TOKEN_SALE_CONTRACT_CODE_BOC =
  'te6cckECFgEABL0AART_APSkE_S88sgLAQIBYgsCAgN5YAoDBPmvEngCgLhACORlg-WD5f_kkDhkAWgJZ4tlh-ToQIgQuEoRY4BZxxQBaYPBg0mQYQBHDIJVACmSWEjSbwJVgBJCB95LgkIH2BHZAm90GBiBdDYQkFScA4DVg-Rlg-WD5OQBaAlniwDoZ4tk7Z5oOGRlj8Tni3wlZ4tE54sAwAcGBQQAps8WiyIiyM8WyItyJhbXQiOiKM8W-ERwAZx6qQymMEMTpFEQwADmMJLLB-QCjhiNBIiLCJtZW1vIjoiY2FuY2VsIn2ASzxaXiyIn2BLPFuLJAczJABAiLCJ0byI6IgB6ZGF0YTphcHBsaWNhdGlvbi9qc29uLHsicCI6ImdyYW0tMjAiLCJvcCI6InRyYW5zZmVyIiwidGljayI6IgH0gEGAQoBDgESARYBGgEeASIBJgEqAS4BMgE2AToBPgFCAUYBSgFOAVIBVgFaAV4BYgFmAWoBhgGKAY4BkgGWAZoBngGiAaYBqgGuAbIBtgG6Ab4BwgHGAcoBzgHSAdYB2gHeAeIB5gHqAMIAxgDKAM4A0gDWANoA3gDgIATKAOYAtgF-APYBBb4AB0MiUIccAs4robCHJCQDkAdcNB2-jAdcNB2-jAdcNB2-jBcD_knA23yLA_5JwNN8kwP-ScDLfJasBBnOwqgMkqwOxBIAPsKoBIqsFsQKAP7ADwACVNFuAQCCZBMAAk4BAMt4B4lJgb4FSYm-BUmNvgVJlb4FQBcsHE8sHEssHEssHAVGsKfgCxYF8IMdCmHwl7Z5vfCD8IXwh_CJ8IvwjfCP8JHwk_CV8JaqFQBUCAs0PDAIBIA4NAFdPhL-Ej4R_hF-ET4QsjLH_hDzxbLf8sH-EbPFssPyw_4SfoC-ErPFszJ7VSACJXtRNDTHwH4YvpAAfhj038B-GTTBwH4ZfpAAfhm0w8B-GfTDwH4aPoAAfhp1h8B-GogxwCXMHD4YW34a5d_-GHUMPhr4oAsXQDoOmuQ_SAYeAL8INnHCDYRfCHjgvlwyOoA_DXo-ANwAOmP_CLgAEvCB5FgAHl6bxBFmxOrzGOC8YEaEcWzGwtzGytkY4LxgTYJQIGZ3U78I2OC-XDI6mmDmH2AcC3CB_l4QREAHWMDL4QxLHBfLhkYIQC-vCAL7y4ZL4RcAA8uGT-EvbPPhD-kQxf4IBXiTtQ9hx-EtTEYAQyMsFUAbPFoIIas_A-gIVy2kUywATzBLLAMzJcfsAcIAQyMsF-EPPFiH6AstqyYEAgvsAcvhl8AYVBPxb-EmCEA7msoCgUiC-8uGS-EXAAPLhkyD6RDFwggFeJO1D2PhL2zz4SfhHqPhIqQRx-EtTEYAQyMsFUAbPFoIIas_A-gIVy2kUywATzBLLABLMyXH7AHCAEMjLBfhGzxYi-gLLaslx-wBwyMsfic8W-ERwAYrmMJLLB-SLEggVFBMSAH7PFvhKzxbJcYAQyMsF-EPPFvhJUAShUAagUASh-gITy2rMyXH7AHCAEMjLBVjPFiH6AstqyYEAgvsAcfhl8AYAGHqpDKYwQxOkURDAAAAmcGF5b3V0IGZvciBzZWxsaW5nIAAa-QBwdMjLAsoHy__J0FP1Bp4'

type ConfirmLotProps = {
  onClose: () => void
  tick: string
  tokenBalance: number
  updateIsSuccessfulTransactionStatus: (
    successfulTransactionStatus: boolean
  ) => void
  updateSuccessfulPopupDisplayMode: (
    successfulPopupDisplayMode: boolean
  ) => void
}

type InitialValues = {
  amount: string
  price: string
}
const initialValues: InitialValues = {
  amount: '',
  price: '',
}

const PROTOCOL_FEE = 0.02

export const ConfirmLotPopup: FC<ConfirmLotProps> = (props) => {
  const {
    onClose,
    tick,
    tokenBalance,
    updateIsSuccessfulTransactionStatus,
    updateSuccessfulPopupDisplayMode,
  } = props
  const [tonConnectUI] = useTonConnectUI()
  const userWalletAddres = useTonAddress()
  const { currentWalletBalance, tonPrice } = useTelegram()

  const [unit, setUnit] = useState<'TON' | 'NANO'>('TON')
  const [requestTimeoutOpen, setRequestTimeoutOpen] = useState(false)

  const [isMainButtonLoading, setIsMainButtonLoading] = useState<boolean>(false)
  const [isMainButtonDisabled, setIsMainButtonDisabled] =
    useState<boolean>(false)

  const tonClient = useMemo(
    () => new TonClient({ endpoint: TON_CLIENT_URL }),
    []
  )

  const retryableTonClientMethod = useCallback(
    async (
      method: 'runMethod' | 'getContractState',
      ...args: [Address, string, TupleItem[] | undefined] | [Address]
    ) => {
      const maxRetries = 3
      let retryCount = 0

      while (retryCount < maxRetries) {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000)) // Задержка в 1 секунду
          const result: {
            gas_used: number
            stack: TupleReader
          } = await (tonClient as any)[method](...args)
          return result
        } catch (error: any) {
          retryCount++
          console.error(
            `Error in ${method}: ${error.message}. Retrying (${retryCount}/${maxRetries})...`
          )
          throw new Error(error)
        }
      }

      setIsMainButtonLoading(false)
      setIsMainButtonDisabled(false)

      alert('Oops ! Network error. Please, try again')
    },
    [tonClient]
  )

  const handleSubmit = useCallback<FormikConfig<InitialValues>['onSubmit']>(
    async (values, helpers) => {
      if (Number(values.amount) > tokenBalance) {
        helpers.setFieldError(
          'amount',
          `Amount can't be more then your ${tick} balance `
        )
        return
      }

      if (!currentWalletBalance || currentWalletBalance < 0.1) {
        alert(
          "Ooops, you don't have enough TON to complete this transaction. Minimum 0.1 TON required on your balance"
        )
        return
      }

      try {
        const price =
          unit === 'TON'
            ? Number(values.price)
            : Number(values.price) / Math.pow(10, 9)
        const totalCount = Number(values.amount) * price

        setIsMainButtonLoading(true)
        setIsMainButtonDisabled(true)

        const tokenSaleContractData = beginCell()
          .storeUint(Math.floor(Date.now() / 1000), 32)
          .storeAddress(Address.parse(userWalletAddres))
          .storeUint(Number(values.amount), 128)
          .storeUint(0, 8)
          .storeAddress(
            Address.parse('UQAmQNz4IPGHpVklTBpD_SV7Bx9jcimHb1gqmjQG_k2Bi0vY')
          )
          .storeUint(199, 16)
          .storeUint(10000, 16)
          .storeCoins(totalCount * Math.pow(10, 9))
          .storeStringTail(tick)
          .endCell()

        const tokenSaleContractCodeCell = Cell.fromBase64(
          TOKEN_SALE_CONTRACT_CODE_BOC
        )

        const saleAddress = contractAddress(0, {
          code: tokenSaleContractCodeCell,
          data: tokenSaleContractData,
        })

        const stateInit = beginCell()
          .storeBit(0)
          .storeBit(0)
          .storeBit(1)
          .storeRef(tokenSaleContractCodeCell)
          .storeBit(1)
          .storeRef(tokenSaleContractData)
          .storeBit(0)
          .endCell()

        const tokenData = await getTokenInfo(tick)

        const userData = await retryableTonClientMethod(
          'runMethod',
          Address.parse(tokenData.address),
          'get_user_data',
          [
            {
              type: 'slice',
              cell: beginCell()
                .storeAddress(Address.parse(userWalletAddres))
                .endCell(),
            },
          ]
        )
        const userStateInit = userData?.stack?.readCell()
        const userContractAddress = userData?.stack?.readAddress()

        const userState = await retryableTonClientMethod(
          'getContractState',
          userContractAddress as Address
        )

        const lotData = await retryableTonClientMethod(
          'runMethod',
          Address.parse(tokenData.address),
          'get_user_data',
          [
            {
              type: 'slice',
              cell: beginCell().storeAddress(saleAddress).endCell(),
            },
          ]
        )
        const saleStateInit = lotData?.stack.readCell()

        const tokenSaleBody = beginCell()
          .storeRef(saleStateInit as Cell)
          .endCell()

        const tokenTransferMessage = `data:application/json,{"p":"gram-20","op":"transfer","tick":"${tick}","amt":"${values.amount}","to":"${saleAddress}","memo":""}`
        const tokenTransferPayload = beginCell()
          .storeUint(0, 32)
          .storeStringTail(tokenTransferMessage)
          .endCell()

        setIsMainButtonLoading(false)
        setIsMainButtonDisabled(false)

        onClose()

        try {
          await tonConnectUI.sendTransaction({
            validUntil: Math.floor(Date.now() / 1000) + 180,
            messages: [
              {
                address: saleAddress.toString(),
                amount: toNano(PROTOCOL_FEE).toString(),
                payload: tokenSaleBody.toBoc().toString('base64'),
                stateInit: stateInit.toBoc().toString('base64'),
              },
              {
                address: userContractAddress?.toString() as string,
                amount: toNano('0.007').toString(),
                payload: tokenTransferPayload.toBoc().toString('base64'),
                // @ts-ignore
                stateInit:
                  userState?.state !== 'active'
                    ? userStateInit?.toBoc().toString('base64')
                    : undefined,
              },
            ],
          })
          updateIsSuccessfulTransactionStatus(true)
        } catch (e) {
          updateIsSuccessfulTransactionStatus(false)
        }

        updateSuccessfulPopupDisplayMode(true)
      } catch (e) {
        alert('Oops ! Network error. Please, try again')
        setRequestTimeoutOpen(true)
      }
    },
    [
      currentWalletBalance,
      onClose,
      retryableTonClientMethod,
      tick,
      tokenBalance,
      tonConnectUI,
      unit,
      updateIsSuccessfulTransactionStatus,
      updateSuccessfulPopupDisplayMode,
      userWalletAddres,
    ]
  )

  return tonPrice ? (
    <S.Wrapper>
      <Modal onClose={onClose} title="Listing Confirmation">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={validationSchema}
        >
          {({ values, handleSubmit, setFieldValue }) => {
            const total =
              Number(values.amount) *
              (unit === 'TON'
                ? Number(values.price)
                : Number(values.price) / Math.pow(10, 9))

            const totalUsd = total * tonPrice
            const fee = total * PROTOCOL_FEE
            const feeUsd = fee * tonPrice
            const receive = total - fee
            const receiveUsd = receive * tonPrice

            return (
              <>
                <S.FieldWrapper>
                  <S.FieldLabelWrapper>
                    <S.FieldLabel children="List Amount" />
                    <S.FieldSecondaryLabel>
                      Available balance:
                      <S.FieldSecondaryLabelLink
                        children={` ${tokenBalance} `}
                        onClick={() => setFieldValue('amount', tokenBalance)}
                      />
                      {tick}
                    </S.FieldSecondaryLabel>
                  </S.FieldLabelWrapper>

                  <S.FormInput
                    editorProps={{
                      type: 'number',
                      actionElement: <S.InnerContentText children={tick} />,
                    }}
                    name="amount"
                    placeholder="0.00"
                  />
                </S.FieldWrapper>

                <S.FieldWrapper>
                  <S.FieldLabelWrapper>
                    <S.FieldLabel children="Unit Price" />
                  </S.FieldLabelWrapper>
                  <S.FormInput
                    editorProps={{
                      type: 'number',
                      actionElement: (
                        <S.InnerToggleWrapper>
                          <S.InnerToggleOption
                            children="TON"
                            active={unit === 'TON'}
                            onClick={() => setUnit('TON')}
                          />
                          <S.InnerToggleOption
                            children="NANOTON"
                            active={unit === 'NANO'}
                            onClick={() => setUnit('NANO')}
                          />
                        </S.InnerToggleWrapper>
                      ),
                    }}
                    name="price"
                    placeholder="0.00"
                  />
                </S.FieldWrapper>

                <S.PositionsWrapper>
                  <S.PositionWrapper>
                    <S.PositionText children="Total Value" />
                    <S.PositionValue
                      children={`${total
                        .toFixed(9)
                        .replace(/\.?0+$/, '')} TON / ${totalUsd
                        .toFixed(4)
                        .replace(/\.?0+$/, '')} USD`}
                    />
                  </S.PositionWrapper>

                  <S.PositionWrapper>
                    <S.PositionText>
                      Service fee{' '}
                      <S.PositionTextLabel>1.99%</S.PositionTextLabel>
                    </S.PositionText>
                    <S.PositionValue
                      children={`${fee
                        .toFixed(9)
                        .replace(/\.?0+$/, '')} TON / ${feeUsd
                        .toFixed(4)
                        .replace(/\.?0+$/, '')} USD`}
                    />
                  </S.PositionWrapper>

                  <S.PositionWrapper>
                    <S.PositionText children="Receive" />
                    <S.PositionValue
                      children={`${receive
                        .toFixed(9)
                        .replace(/\.?0+$/, '')} TON / ${receiveUsd
                        .toFixed(2)
                        .replace(/\.?0+$/, '')} USD`}
                    />
                  </S.PositionWrapper>
                </S.PositionsWrapper>
                <MainButton
                  disabled={isMainButtonDisabled}
                  onClick={handleSubmit}
                  progress={isMainButtonLoading}
                  text="Confirm"
                />
              </>
            )
          }}
        </Formik>
      </Modal>
      {requestTimeoutOpen && (
        <RequestTimoutPopup onClose={() => setRequestTimeoutOpen(false)} />
      )}
    </S.Wrapper>
  ) : null
}
