import { FC } from 'react'
import { useFormikContext } from 'formik'
import { MainButton } from 'features/MainButton'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgToncoinIcon } from 'ui/icons'
import { Modal } from 'ui/Modal/Modal'
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators'
import * as S from './style'
import { type InitialValues } from '../DeployForm/types'

type ConfirmPopupProps = {
  onClose: () => void
  fee: string
  onConfirm: () => void
  isLoading: boolean
  userBalance: number
  type?: 'deploy' | 'metadata'
}

const BUY_TON_LINK =
  'https://ton.org/en/buy-toncoin?filters[exchange_groups][slug][$eq]=buy-with-card&pagination[page]=1&pagination[pageSize]=100'

export const ConfirmPopup: FC<ConfirmPopupProps> = (props) => {
  const {
    onClose,
    isLoading,
    onConfirm,
    fee,
    userBalance,
    type = 'deploy',
  } = props

  const { values } = useFormikContext<InitialValues>()

  const { webApp, tonPrice } = useTelegram()

  const currentTotalAmount = 0.1

  const handleBuyTonClick = () => {
    webApp?.disableClosingConfirmation()
    window.open(BUY_TON_LINK, '_blank')
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <S.Flex>
        {values.file && <S.Image alt="image" src={values.file} />}
        <S.Title
          children={
            type === 'deploy' ? 'Confirm Deploy' : 'Confirm Deploy token logo'
          }
        />
        <S.Description
          children={`Confirm in your wallet to deploy ${
            type === 'metadata' && 'logo'
          }`}
        />
      </S.Flex>
      <S.Wrapper>
        {type === 'deploy' && (
          <S.FieldsWrapper>
            <S.FieldWrapper>
              <S.Label children="Tick:" />
              <S.ValueLabel children={values.tick} />
            </S.FieldWrapper>

            <S.Line />
            <>
              <S.FieldWrapper>
                <S.Label children="Total supply:" />
                <S.ValueLabel
                  children={formatNumberWithSeparators(Number(values.amount))}
                />
              </S.FieldWrapper>

              <S.Line />

              <S.FieldWrapper>
                <S.Label children="Limit per mint" />
                <S.ValueLabel>{values.limit}</S.ValueLabel>
              </S.FieldWrapper>
            </>
          </S.FieldsWrapper>
        )}

        <S.TotalFeeContainer>
          <S.Label children="Processing Fees:" />
          <S.TotalFeeValueContainer>
            <SvgToncoinIcon />
            {tonPrice && (
              <S.ValueLabel
                children={`${fee} TON ~ $${(Number(fee) * tonPrice).toFixed(
                  4
                )}`}
              />
            )}
          </S.TotalFeeValueContainer>
        </S.TotalFeeContainer>
      </S.Wrapper>

      <MainButton
        onClick={
          currentTotalAmount > userBalance ? handleBuyTonClick : onConfirm
        }
        progress={isLoading}
        text={currentTotalAmount > userBalance ? 'Buy TON' : 'Confirm Deploy'}
      />
    </Modal>
  )
}
