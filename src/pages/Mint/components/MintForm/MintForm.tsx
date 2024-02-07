import { FC, useEffect, useMemo, useState } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { useFormikContext } from 'formik'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import { getTokenInfo } from 'api'
import { type CurrentConfirmData } from 'pages/Mint/Mint'
import { Button } from 'ui/Button/Button'
import { RepeatBlock } from './components'
import * as S from './MintForm.style'
import { type InitialValues } from './types'

type MintFormProps = {
  intervalFreeze: number | null
  currentConfirmData: CurrentConfirmData | null
  isInscribing: boolean
}

export const MintForm: FC<MintFormProps> = ({
  intervalFreeze,
  currentConfirmData,
  isInscribing,
}) => {
  const userWalletAddress = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()
  const [searchParams] = useSearchParams()

  const { values, setFieldValue, handleSubmit } =
    useFormikContext<InitialValues>()

  const [currentMintAmount, setCurrentMintAmount] = useState('')

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
        setCurrentMintAmount(data.mint_limit.toString())

        setFieldValue('amount', data.mint_limit.toString())
      },
    }
  )

  useEffect(() => {
    if (currentMintAmount && !values.amount) {
      setFieldValue('amount', currentMintAmount)
    }
  }, [
    addressSearchParam,
    amountSearchParam,
    currentMintAmount,
    memoSearchParam,
    setFieldValue,
    values,
  ])

  const currentMainButtonName = useMemo(() => {
    switch (true) {
      case !userWalletAddress:
        return 'Connect Wallet'
      case intervalFreeze !== null && intervalFreeze > 0:
        return `Repeat mint after ${intervalFreeze} seconds...`
      default:
        return 'Mint'
    }
  }, [intervalFreeze, userWalletAddress])

  return (
    <S.Wrapper>
      <S.FieldsWrapper>
        <S.Input
          editorProps={{
            disabled:
              Boolean(tickSearchParam) &&
              isTokenDataBySearchParamLoaded &&
              Boolean(values.tick),
          }}
          label="Tick"
          name="tick"
          placeholder="Characters like “abcd”"
        />

        <S.Input
          editorProps={{
            disabled:
              Boolean(tickSearchParam) &&
              isTokenDataBySearchParamLoaded &&
              Boolean(values.tick),
          }}
          label="Limit / mint"
          name="amount"
          placeholder="10,000"
        />

        <RepeatBlock
          count={Number(values.repeat)}
          label="Repeat Mint"
          onChange={(count) => setFieldValue('repeat', count.toString())}
        />
        {!currentConfirmData && (
          <Button
            children={currentMainButtonName}
            isDisabled={intervalFreeze !== null && intervalFreeze > 0}
            isLoading={isInscribing}
            onClick={
              !userWalletAddress ? () => tonConnectUI.openModal() : handleSubmit
            }
          />
        )}
        {/* {!currentConfirmData && (
                <MainButton
                  disabled={intervalFreeze !== null && intervalFreeze > 0}
                  onClick={
                    !userWalletAddress
                      ? () => tonConnectUI.openModal()
                      : handleSubmit
                  }
                  progress={isInscribing}
                  text={currentMainButtonName}
                />
              )} */}
      </S.FieldsWrapper>
    </S.Wrapper>
  )
}
