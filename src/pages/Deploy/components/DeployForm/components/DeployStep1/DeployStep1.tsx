import { FC, useEffect } from 'react'
import { useField } from 'formik'
import { useQuery } from 'react-query'
import { getTokenInfo } from 'api'
import { useDebounce } from 'hooks/useDebounce/useDebounce'
import { Input } from 'ui/Input/Input'
import * as S from './style'

export const DeployStep1: FC = () => {
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

  return (
    <S.Wrapper>
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
        type="number"
      />
      <Input
        {...limitField}
        error={!!(limitMeta?.touched && limitMeta?.error)}
        errorMessage={limitMeta?.error}
        label="Set Limit/Mint"
        name="limit"
        placeholder="0"
        type="number"
      />
    </S.Wrapper>
  )
}
