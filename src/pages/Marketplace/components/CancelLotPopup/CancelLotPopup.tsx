import React, { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
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
    <S.Wrapper>
      <Modal onClose={onClose} title="My order">
        <S.PositionsWrapper>
          <S.PositionWrapper>
            <S.PositionText children="Tick" />
            <S.PositionValue children={`${ticker.toUpperCase()}`} />
          </S.PositionWrapper>
          <S.PositionWrapper>
            <S.PositionText children="Amount" />
            <S.PositionValue children={`${amount} ${ticker}`} />
          </S.PositionWrapper>

          <S.PositionWrapper>
            <S.PositionText children="Sale Price/Toker" />
            <S.PositionValue
              children={`${price
                .toFixed(9)
                .replace(/\.?0+$/, '')} TON / ${priceUsd
                .toFixed(9)
                .replace(/\.?0+$/, '')} USD`}
            />
          </S.PositionWrapper>
          <S.PositionWrapper>
            <S.PositionText children="Total Value" />
            <S.PositionValue
              children={`${total
                .toFixed(9)
                .replace(/\.?0+$/, '')} TON / ${totalUsd
                .toFixed(9)
                .replace(/\.?0+$/, '')} USD`}
            />
          </S.PositionWrapper>
        </S.PositionsWrapper>
      </Modal>
    </S.Wrapper>
  )
}

export const SkeletCancelPopup = () => (
  <S.Wrap>
    <div style={{ width: '100%' }}>
      <Skeleton height={'100%'} />
    </div>
  </S.Wrap>
)
