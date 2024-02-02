import { FC } from 'react'
import { toNano } from '@ton/core'
import { useFormikContext } from 'formik'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { Button } from 'ui/Button/Button'
import { SvgToncoinIcon } from 'ui/icons'
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

  const { webApp, tonPrice } = useTelegram()


  const currentTotalAmount = Number(BigInt(fee) * BigInt(Number(values.repeat)) + toNano('0.008')) / 1e9

  const handleBuyTonClick = () => {
    webApp.disableClosingConfirmation()
    window.open(BUY_TON_LINK, '_blank')
    onClose()
  }

  const totalFeeTon = +(values.repeat || 0) * (+fee / 1e9);
  const totalFeeUsd = ((tonPrice || 0) * totalFeeTon).toFixed(5);

  const isUserBalaceLessTotal = userBalance < currentTotalAmount;
  return (
    <Modal
      onClose={onClose}
      title='Confirm Mint'
    >
      <S.Wrapper>
        <S.FieldsWrapper>
          <S.FieldWrapper>
            <S.Label children="Tick:" />
            <S.ValueLabel children={values.tick} />
          </S.FieldWrapper>

          <S.Line />
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
        </S.FieldsWrapper>

        <S.TotalFeeContainer>
          <S.Label children="Total Fees:" />
          <S.TotalFeeValueContainer>
            <SvgToncoinIcon />
            <S.ValueLabel children={` ${totalFeeTon}TON ~ $${totalFeeUsd}`} />
          </S.TotalFeeValueContainer>
        </S.TotalFeeContainer>

        <Button
          children={isUserBalaceLessTotal ? 'Buy TON' : 'Confirm Mint'}
          isLoading={isLoading}
          onClick={isUserBalaceLessTotal ? handleBuyTonClick : onConfirm}
        />
      </S.Wrapper>
    </Modal>
  )
}
