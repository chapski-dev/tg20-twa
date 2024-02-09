import { FC, useMemo } from 'react'
import { toNano } from '@ton/core'
import { useFormikContext } from 'formik'
import { MainButton } from 'features/MainButton'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { InscribeFormType } from 'pages/Inscribe/types'
import { SvgToncoinIcon } from 'ui/icons'
import { Modal } from 'ui/Modal/Modal'
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators'
import { shortenAddress } from 'utils/shortenAddress'
import * as S from './style'
import { type InitialValues } from '../InscribeForm/types'

type ConfirmPopupProps = {
  onClose: () => void
  formType: InscribeFormType
  fee: string
  onConfirm: () => void
  isLoading: boolean
  userBalance: number
}

const BUY_TON_LINK =
  'https://ton.org/en/buy-toncoin?filters[exchange_groups][slug][$eq]=buy-with-card&pagination[page]=1&pagination[pageSize]=100'

const mainButtonLabelDictionary = {
  mint: 'Mint',
  deploy: 'Deploy',
  transfer: 'Transfer',
} as const

export const ConfirmPopup: FC<ConfirmPopupProps> = (props) => {
  const { onClose, formType, isLoading, onConfirm, fee, userBalance } = props

  const { values } = useFormikContext<InitialValues>()

  const { webApp, tonPrice } = useTelegram()

  const currentTotalAmount = useMemo(() => {
    switch (formType) {
      case 'mint':
        return (
          Number(
            BigInt(fee) * BigInt(Number(values.repeat)) + toNano('0.008')
          ) / 1e9
        )
      case 'deploy':
        return 0.1
      case 'transfer':
        return Number(toNano('0.008')) / 1e9
    }
  }, [fee, formType, values.repeat])

  const handleBuyTonClick = () => {
    webApp?.disableClosingConfirmation()
    window.open(BUY_TON_LINK, '_blank')
    onClose()
  }

  const currentConfirmInfoContent = useMemo(() => {
    switch (formType) {
      case 'mint':
        return (
          <>
            <S.FieldWrapper>
              <S.Label children="Amount:" />
              <S.ValueLabel children={formatNumberWithSeparators(Number(values.amount))} />
            </S.FieldWrapper>

            <S.Line />

            <S.FieldWrapper>
              <S.Label children="Repeat mint:" />
              <S.ValueLabel children={`${values.repeat} times`} />
            </S.FieldWrapper>

            <S.Line />

            <S.FieldWrapper>
              <S.Label children="Protocol Fee/Mint:" />
              <S.ValueLabel children={`${Number(fee) / 1e9} TON`} />
            </S.FieldWrapper>
          </>
        )
      case 'deploy':
        return (
          <>
            <S.FieldWrapper>
              <S.Label children="Total supply:" />
              <S.ValueLabel children={formatNumberWithSeparators(Number(values.amount))} />
            </S.FieldWrapper>

            <S.Line />

            <S.FieldWrapper>
              <S.Label children="Limit per mint" />
              <S.ValueLabel>{values.limit}</S.ValueLabel>
            </S.FieldWrapper>
          </>
        )
      case 'transfer':
        return (
          <>
            <S.FieldWrapper>
              <S.Label children="To:" />
              <S.ValueLabel>{shortenAddress(values.to!)}</S.ValueLabel>
            </S.FieldWrapper>

            <S.Line />

            <S.FieldWrapper>
              <S.Label children="Amount" />
              <S.ValueLabel children={values.amount} />
            </S.FieldWrapper>
          </>
        )
    }
  }, [fee, formType, values.amount, values.limit, values.repeat, values.to])

  const totalFeeTon = +(values.repeat || 0) * (+fee / 1e9);
  const totalFeeUsd = ((tonPrice || 0) * totalFeeTon).toFixed(5);

  return (
    <Modal
      onClose={onClose}
      title={'Confirm ' + mainButtonLabelDictionary[formType]}
    >
      <S.Wrapper>
        <S.FieldsWrapper>
          <S.FieldWrapper>
            <S.Label children="Tick:" />
            <S.ValueLabel children={values.tick} />
          </S.FieldWrapper>

          <S.Line />
          {currentConfirmInfoContent}
        </S.FieldsWrapper>

        <S.TotalFeeContainer>
          <S.Label children="Total Fees:" />
          <S.TotalFeeValueContainer>
            <SvgToncoinIcon />
            <S.ValueLabel children={` ${totalFeeTon}TON ~ $${totalFeeUsd}`} />
          </S.TotalFeeValueContainer>
        </S.TotalFeeContainer>
      </S.Wrapper>

      <MainButton
        onClick={
          currentTotalAmount > userBalance ? handleBuyTonClick : onConfirm
        }
        progress={isLoading}
        text={
          currentTotalAmount > userBalance
            ? 'Buy TON'
            : 'Confirm ' + mainButtonLabelDictionary[formType]
        }
      />
    </Modal>
  )
}
