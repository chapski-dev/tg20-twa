import { FC, useEffect, useMemo, useState } from 'react'
import { useFormikContext } from 'formik'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import { getTokenInfo } from 'api'
import { FormInput } from 'features/FormFields/FormInput/FormInput'
import { RepeatBlock } from './components'
import * as S from './style'
import { type InitialValues } from './types'
import { type InscribeFormType } from '../../types'

type InscribeFormProps = {
  type: InscribeFormType
}

export const InscribeForm: FC<InscribeFormProps> = (props) => {
  const { type } = props

  const [searchParams] = useSearchParams()

  const { values, setFieldValue } = useFormikContext<InitialValues>()

  const [currentMintAmount, setCurrentMintAmount] = useState<string>('')

  const tickSearchParam = searchParams.get('tick')
  const amountSearchParam = searchParams.get('amount')
  const addressSearchParam = searchParams.get('address')
  const memoSearchParam = searchParams.get('memo')

  const { isSuccess: isTokenDataBySearchParamLoaded } = useQuery(
    ['token-data-by-search-param'],
    () => getTokenInfo(tickSearchParam as string),
    {
      enabled: !!tickSearchParam,
      onSuccess: (data) => {
        if (type === 'mint') {
          setCurrentMintAmount(data.mint_limit.toString())

          setFieldValue('amount', data.mint_limit.toString())
        }
      },
    }
  )

  useEffect(() => {
    if (currentMintAmount && !values.amount && type === 'mint') {
      setFieldValue('amount', currentMintAmount)
    }

    if (type === 'transfer' && !values.to) {
      setFieldValue('amount', amountSearchParam ? amountSearchParam : '')

      setFieldValue('to', addressSearchParam ? addressSearchParam : '')

      setFieldValue('memo', memoSearchParam ? memoSearchParam : '')
    }
  }, [
    addressSearchParam,
    amountSearchParam,
    currentMintAmount,
    memoSearchParam,
    setFieldValue,
    type,
    values,
  ])

  const currrentFormContent = useMemo(() => {
    switch (type) {
      case 'mint':
        return (
          <>
            <S.FieldsWrapper>
              <FormInput
                editorProps={{
                  disabled:
                    Boolean(tickSearchParam) &&
                    isTokenDataBySearchParamLoaded &&
                    Boolean(values.tick),
                }}
                label="TICK"
                name="tick"
                placeholder="Characters like “abcd”"
              />

              <FormInput
                editorProps={{
                  disabled:
                    Boolean(tickSearchParam) &&
                    isTokenDataBySearchParamLoaded &&
                    Boolean(values.tick),
                }}
                label="AMOUNT"
                name="amount"
                placeholder="10,000"
              />

              <RepeatBlock
                count={Number(values.repeat)}
                label="REPEAT MINT"
                onChange={(count) => setFieldValue('repeat', count.toString())}
              />
            </S.FieldsWrapper>
          </>
        )
      case 'deploy':
        return (
          <>
            <S.FieldsWrapper>
              <FormInput
                label="TICK"
                name="tick"
                placeholder="Characters like “abcd”"
              />
              <FormInput
                label="TOTAL SUPPLY"
                name="amount"
                placeholder="2,100,000"
              />
              <FormInput label="LIMIT PER MINT" name="limit" placeholder="1" />
              {/* <FormInput
                label="PRE MINT AMOUNT"
                name="premintAmount"
                placeholder="1"
              />
              <FormInput
                label="INTERVAL (SECONDS)"
                name="interval"
                placeholder="15"
              />
              <FormInput
                label="PENALTY (SECONDS)"
                name="penalty"
                placeholder="15"
              /> */}
            </S.FieldsWrapper>
          </>
        )
      case 'transfer':
        return (
          <>
            <S.FieldsWrapper>
              <FormInput
                editorProps={{
                  disabled:
                    Boolean(tickSearchParam) &&
                    isTokenDataBySearchParamLoaded &&
                    Boolean(values.tick),
                }}
                label="TICK"
                name="tick"
                placeholder="Characters like “abcd”"
              />
              <FormInput label="TO" name="to" placeholder="Receiver address" />
              <FormInput label="AMOUNT" name="amount" placeholder="10,000" />
              <FormInput
                label="MEMO (optional)"
                name="memo"
                placeholder="Comment"
              />
            </S.FieldsWrapper>
          </>
        )
    }
  }, [
    type,
    tickSearchParam,
    isTokenDataBySearchParamLoaded,
    values.tick,
    values.repeat,
    setFieldValue,
  ])

  return (
    <S.Wrapper>
      {currrentFormContent}
      {/* <InfoBlock /> */}
    </S.Wrapper>
  )
}
