import React, { FC } from 'react'
import { SvgArrowDownIcon } from 'ui/icons'
import { Modal } from 'ui/Modal/Modal'
import * as S from './style'

type BuyLotProps = {
  onClose: () => void
  fromAmount: number
  toAmount: number
  ticker: string
  priceTon: number
  priceUsd: number
  total: number
}

export const BuyLotPopup: FC<BuyLotProps> = ({
  onClose,
  fromAmount,
  toAmount,
  ticker,
  priceTon,
  priceUsd,
  total,
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
            <S.ValueLabel>
              {fromAmount.toFixed(9).replace(/\.?0+$/, '')}
            </S.ValueLabel>
            <S.TokenLabel>TON</S.TokenLabel>
          </S.FieldWrapper>

          <S.Line />

          <S.FieldWrapper>
            <S.ValueLabel>{toAmount}</S.ValueLabel>
            <S.TokenLabel>{ticker}</S.TokenLabel>
          </S.FieldWrapper>

          <S.ArrowDown>
            <SvgArrowDownIcon />
          </S.ArrowDown>
        </S.FieldsWrapper>

        <S.PositionsWrapper>
          <S.PositionWrapper>
            <S.PositionText>Price</S.PositionText>
            <S.PositionValue>
              {priceTon.toFixed(9).replace(/\.?0+$/, '')} TON /{' '}
              {priceUsd.toFixed(9).replace(/\.?0+$/, '')} USD
            </S.PositionValue>
          </S.PositionWrapper>

          <S.PositionWrapper>
            <S.PositionText>Gas fee</S.PositionText>
            <S.PositionValue>
              {+GAS_FEE.toFixed(6)} TON / {+gasFeeUsd.toFixed(4)} USD
            </S.PositionValue>
          </S.PositionWrapper>

          <S.PositionWrapper>
            <S.PositionText>
              Service fee <S.PositionTextLabel>1.99%</S.PositionTextLabel>
            </S.PositionText>
            <S.PositionValue>
              {fee.toFixed(9).replace(/\.?0+$/, '')} TON /{' '}
              {feeUsd.toFixed(9).replace(/\.?0+$/, '')} USD
            </S.PositionValue>
          </S.PositionWrapper>

          <S.PositionWrapper>
            <S.PositionText>Total</S.PositionText>
            <S.PositionValue>
              {totalWithFee.toFixed(9).replace(/\.?0+$/, '')} TON /{' '}
              {totalWithFeeUsd.toFixed(9).replace(/\.?0+$/, '')} USD
            </S.PositionValue>
          </S.PositionWrapper>
        </S.PositionsWrapper>
      </S.Wrapper>
    </Modal>
  )
}
