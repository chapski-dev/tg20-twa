import { FC } from 'react'
import { toNano } from '@ton/core'
import { useFormikContext } from 'formik'
import { MainButton } from 'features/MainButton'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { Modal } from 'ui/Modal/Modal'
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators'
import * as S from './ConfirmPopup.style'
import { type InitialValues } from '../MintForm/types'

type ConfirmPopupProps = {
  onClose: () => void
  fee: string
  onConfirm: () => void
  isLoading: boolean
  userBalance: number
}

const BUY_TON_LINK = 'https://ton.org/en/buy-toncoin?filters[exchange_groups][slug][$eq]=buy-with-card&pagination[page]=1&pagination[pageSize]=100'


export const ConfirmPopup: FC<ConfirmPopupProps> = (props) => {
  const { onClose, isLoading, onConfirm, fee, userBalance } = props

  const { values } = useFormikContext<InitialValues>()

  const { webApp } = useTelegram()

  const currentTotalAmount = Number(BigInt(fee) * BigInt(Number(values.repeat)) + toNano('0.008')) / 1e9

  const handleBuyTonClick = () => {
    webApp.disableClosingConfirmation()
    window.open(BUY_TON_LINK, '_blank')
    onClose()
  }

  return (
    <Modal
      onClose={onClose}
      title='Confirm Mint'
    >
      <S.Wrapper>
        <S.FieldsWrapper>
          <S.FieldWrapper>
            <S.Label>TICK:</S.Label>
            <S.ValueLabel>{values.tick}</S.ValueLabel>
          </S.FieldWrapper>

          <S.Line />

          <S.FieldWrapper>
            <S.Label>AMOUNT:</S.Label>
            <S.ValueLabel>
              {formatNumberWithSeparators(Number(values.amount))}
              {/* 50 */}
            </S.ValueLabel>
          </S.FieldWrapper>

          <S.Line />

          <S.FieldWrapper>
            <S.Label>REPEAT MINT:</S.Label>
            <S.ValueLabel>{values.repeat}</S.ValueLabel>
          </S.FieldWrapper>

          <S.Line />

          <S.FieldWrapper>
            <S.Label>PROTOCOL FEE:</S.Label>
            <S.ValueLabel>{Number(fee) / 1e9} TON</S.ValueLabel>
          </S.FieldWrapper>
        </S.FieldsWrapper>

        <S.FieldsWrapper>
          <S.FieldWrapper>
            <S.Label>TOTAL AMOUNT:</S.Label>
            <S.ValueLabel>{currentTotalAmount.toString()} TON</S.ValueLabel>
          </S.FieldWrapper>
        </S.FieldsWrapper>
      </S.Wrapper>

      <MainButton
        onClick={
          currentTotalAmount > userBalance ? handleBuyTonClick : onConfirm
        }
        progress={isLoading}
        text={
          currentTotalAmount > userBalance
            ? 'Buy TON'
            : 'Confirm Mint'
        }
      />
    </Modal>
  )
}
