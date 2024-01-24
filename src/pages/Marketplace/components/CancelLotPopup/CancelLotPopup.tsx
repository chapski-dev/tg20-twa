import React, { FC } from 'react'
import { Modal } from 'ui/Modal/Modal'
import * as S from './style'

type CancelLotProps = {
  onClose: () => void
  onConfirm: () => void
  ticker: string
  amount: number
  price: number
  priceUsd: number
  total: number
  totalUsd: number
}

export const CancelLotPopup: FC<CancelLotProps> = ({
  onClose,
  ticker,
  amount,
  price,
  priceUsd,
  total,
  totalUsd,
}) => {
  return (
    <Modal onClose={onClose} title="Confirmation">
      <S.Wrapper>
        <S.PositionsWrapper>
          <S.PositionWrapper>
            <S.PositionText>Total Value</S.PositionText>
            <S.PositionValue>
              {total.toFixed(9).replace(/\.?0+$/, '')} TON /{' '}
              {totalUsd.toFixed(9).replace(/\.?0+$/, '')} USD
            </S.PositionValue>
          </S.PositionWrapper>

          <S.PositionWrapper>
            <S.PositionText>Price</S.PositionText>
            <S.PositionValue>
              {price.toFixed(9).replace(/\.?0+$/, '')} TON /{' '}
              {priceUsd.toFixed(9).replace(/\.?0+$/, '')} USD
            </S.PositionValue>
          </S.PositionWrapper>

          <S.PositionWrapper>
            <S.PositionText>Amount</S.PositionText>
            <S.PositionValue>
              {amount} {ticker}
            </S.PositionValue>
          </S.PositionWrapper>
        </S.PositionsWrapper>
      </S.Wrapper>
    </Modal>
  )
}
