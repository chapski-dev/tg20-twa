import { FC, useMemo } from 'react'
import { toNano } from '@ton/core'
import { useFormikContext } from 'formik'
import { MainButton } from 'features/MainButton'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { InscribeFormType } from 'pages/Inscribe/types'
import { Modal } from 'ui/Modal/Modal'
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators'
import { shortenAddress } from 'utils/shortenAddress'
import * as S from './style'
import { IInitialValues } from '../InscribeForm/types'

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

  const { values } = useFormikContext<IInitialValues>()

  const { webApp } = useTelegram()

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
    webApp.disableClosingConfirmation()
    window.open(BUY_TON_LINK, '_blank')
    onClose()
  }

  const currentConfirmInfoContent = useMemo(() => {
    switch (formType) {
      case 'mint':
        return (
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
        )
      case 'deploy':
        return (
          <S.Wrapper>
            <S.FieldsWrapper>
              <S.FieldWrapper>
                <S.Label>TICK:</S.Label>
                <S.ValueLabel>{values.tick}</S.ValueLabel>
              </S.FieldWrapper>

              <S.Line />

              <S.FieldWrapper>
                <S.Label>TOTAL SUPPLY:</S.Label>
                <S.ValueLabel>
                  {formatNumberWithSeparators(Number(values.amount))}
                </S.ValueLabel>
              </S.FieldWrapper>

              <S.Line />

              <S.FieldWrapper>
                <S.Label>LIMIT PER MINT</S.Label>
                <S.ValueLabel>{values.limit}</S.ValueLabel>
              </S.FieldWrapper>
            </S.FieldsWrapper>

            <S.FieldsWrapper>
              <S.FieldWrapper>
                <S.Label>TOTAL AMOUNT:</S.Label>
                <S.ValueLabel>0.1 TON</S.ValueLabel>
              </S.FieldWrapper>
            </S.FieldsWrapper>
          </S.Wrapper>
        )
      case 'transfer':
        return (
          <S.Wrapper>
            <S.FieldsWrapper>
              <S.FieldWrapper>
                <S.Label>TICK:</S.Label>
                <S.ValueLabel>{values.tick}</S.ValueLabel>
              </S.FieldWrapper>

              <S.Line />

              <S.FieldWrapper>
                <S.Label>TO:</S.Label>
                <S.ValueLabel>{shortenAddress(values.to!)}</S.ValueLabel>
              </S.FieldWrapper>

              <S.Line />

              <S.FieldWrapper>
                <S.Label>AMOUNT</S.Label>
                <S.ValueLabel>{values.amount}</S.ValueLabel>
              </S.FieldWrapper>

              <S.Line />

              {/* <S.FieldWrapper>
                <S.Label>FEE:</S.Label>
                <S.ValueLabel>{fee} TON</S.ValueLabel>
              </S.FieldWrapper> */}
            </S.FieldsWrapper>

            <S.FieldsWrapper>
              <S.FieldWrapper>
                <S.Label>TOTAL AMOUNT:</S.Label>
                <S.ValueLabel>{currentTotalAmount.toString()} TON</S.ValueLabel>
              </S.FieldWrapper>
            </S.FieldsWrapper>
          </S.Wrapper>
        )
    }
  }, [currentTotalAmount, fee, formType, values])

  return (
    <Modal
      onClose={onClose}
      title={'Confirm ' + mainButtonLabelDictionary[formType]}
    >
      {currentConfirmInfoContent}

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
