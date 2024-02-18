import { FC, useEffect, useMemo } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { useField, useFormikContext } from 'formik'
import { useQuery } from 'react-query'
import { getTokenInfo } from 'api'
import { useDebounce } from 'hooks/useDebounce/useDebounce'
import { CurrentConfirmData } from 'pages/Deploy/Deploy'
import { Button } from 'ui'
import { Input } from 'ui/Input/Input'
import Stepper from 'ui/Stepper/Stepper'
import * as S from './style'
import { ConfirmPopup } from '../ConfirmPopup/ConfirmPopup'

type DeployFormProps = {
  loading: boolean
  currentConfirmData: CurrentConfirmData | null
  intervalFreeze: number
  signConfirmTransaction: () => Promise<void>
  setCurrentConfirmData: React.Dispatch<
    React.SetStateAction<CurrentConfirmData | null>
  >
}

export const DeployForm: FC<DeployFormProps> = (props) => {
  const {
    loading,
    currentConfirmData,
    intervalFreeze,
    signConfirmTransaction,
    setCurrentConfirmData,
  } = props
  const { handleSubmit } = useFormikContext()
  const userWalletAddress = useTonAddress()
  const [tickField, tickMeta, tickHepler] = useField<string>('tick')
  const [amountField, amountMeta] = useField('amount')
  const [limitField, limitMeta] = useField('limit')

  const tickValueDebounce = useDebounce(tickField.value, 500)

  const { data } = useQuery(
    ['token-data-by-search-param'],
    () => getTokenInfo(tickValueDebounce.toLowerCase()),
    {
      enabled: tickValueDebounce.length === 4,
      onError: (error) => console.error('getTokenInfo error', error),
    }
  )

  useEffect(() => {
    if (data?.tick) {
      tickHepler.setError('Tick already exist, select different tick name')
    }
  }, [data, tickHepler])

  const buttonText = useMemo(() => {
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
    <S.FormWrapper>
      <Stepper step={0} totalSteps={2} />
      <S.Wrapper>
        <S.FieldsWrapper>
          <Input
            {...tickField}
            error={!!(tickMeta?.touched && tickMeta?.error) || !!data?.tick}
            errorMessage={tickMeta?.error}
            isSuccess={tickField?.value?.length === 4}
            label="Tick "
            onChange={(e) => tickHepler.setValue(e.target.value.toLowerCase())}
            placeholder="Characters like “abcd”"
            sublabel="(only 4 characters allowed)"
          />
          <Input
            {...amountField}
            error={!!(amountMeta?.touched && amountMeta?.error)}
            errorMessage={amountMeta?.error}
            isSuccess={amountMeta?.value?.length >= 8}
            label="Set Total Supply"
            name="amount"
            placeholder="210 000 000 000"
          />
          <Input
            {...limitField}
            error={!!(limitMeta?.touched && limitMeta?.error)}
            errorMessage={limitMeta?.error}
            label="Set Limit/Mint"
            name="limit"
            placeholder="0"
          />
          {/* // TODO: Вернуть когда будут степы */}
          {/* <ImageInput
            disabled={!(tickField.value && amountField.value && limitField.value)}
            label="Upload token logo"
            name="file"
          /> */}
        </S.FieldsWrapper>
      </S.Wrapper>

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
  )
}
