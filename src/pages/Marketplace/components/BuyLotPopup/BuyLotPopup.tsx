import React, { FC } from 'react'
import { Button } from 'ui/Button/Button'
import { SvgToncoinIcon } from 'ui/icons'
import { Modal } from 'ui/Modal/Modal'
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators'
import * as S from './style'

type BuyLotProps = {
  onClose: () => void
  fromAmount: number
  toAmount: number
  ticker: string
  priceTon: number
  priceUsd: number
  total: number
  handleBuyConfirmation: () => Promise<void>;
}
export const BuyLotPopup: FC<BuyLotProps> = ({
  onClose,
  fromAmount,
  toAmount,
  ticker,
  priceTon,
  priceUsd,
  total,
  handleBuyConfirmation,
}) => {
  const PROTOCOL_FEE = 0.02
  const GAS_FEE = 0.25

  const tonPrice = priceUsd / priceTon

  const gasFeeUsd = GAS_FEE * tonPrice

  const fee = total * PROTOCOL_FEE
  const feeUsd = fee * tonPrice

  const totalWithFee = total + GAS_FEE
  const totalWithFeeUsd = totalWithFee * tonPrice

  return (
    <Modal onClose={onClose} title="Confirmation">
      <S.Wrapper>
        <S.FieldsWrapper>
          <S.FieldWrapper>
            <S.ValueLabel children={fromAmount.toFixed(9).replace(/\.?0+$/, '')} />
            <S.TokenWrapper>
              <SvgToncoinIcon height={24} width={23} />
              <S.TokenLabel children="TON" />
            </S.TokenWrapper>
          </S.FieldWrapper>
          <i>for</i>
          <S.FieldWrapper>
            <S.ValueLabel children={formatNumberWithSeparators(toAmount)} />
            <S.TokenLabel children={ticker} />
          </S.FieldWrapper>
        </S.FieldsWrapper>

        <S.PositionsContainer>
          <S.PositionWrapper>
            <S.PositionText children="Price" />
            <S.PositionValue children={`${priceTon.toFixed(9).replace(/\.?0+$/, '')} TON / 
              ${priceUsd.toFixed(9).replace(/\.?0+$/, '')} USD`} />
          </S.PositionWrapper>

          <S.PositionWrapper>
            <S.PositionText children="Gas fee" />
            <S.PositionValue children={`${+GAS_FEE.toFixed(6)} TON / ${+gasFeeUsd.toFixed(4)} USD`} />
          </S.PositionWrapper>

          <S.PositionWrapper>
            <S.PositionText>
              Service fee <S.PositionTextLabel children="1.99%" />
            </S.PositionText>
            <S.PositionValue children={`${fee.toFixed(9).replace(/\.?0+$/, '')} TON / 
              ${feeUsd.toFixed(9).replace(/\.?0+$/, '')} USD`} />
          </S.PositionWrapper>

          <S.PositionWrapper>
            <S.PositionText children="Total" />
            <S.PositionValue children={`${totalWithFee.toFixed(9).replace(/\.?0+$/, '')} TON / 
              ${totalWithFeeUsd.toFixed(9).replace(/\.?0+$/, '')} USD`} />
          </S.PositionWrapper>
        </S.PositionsContainer>
        <Button children="Buy Now" onClick={handleBuyConfirmation} />
      </S.Wrapper>
    </Modal>
  )
}
