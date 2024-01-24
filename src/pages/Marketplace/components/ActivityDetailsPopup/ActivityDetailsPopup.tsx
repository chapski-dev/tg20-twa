import React, { FC } from 'react'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { Modal } from 'ui/Modal/Modal'
import * as S from './style'

type ActivityDetailsPopupProps = {
  onClose: () => void
  onConfirm: () => void
  ticker: string
  amount: number
  address: string
  date: Date
}

export const ActivityDetailsPopup: FC<ActivityDetailsPopupProps> = ({
  onClose,
  ticker,
  amount,
  address,
  date,
}) => {
  const tma = useTelegram()

  return (
    <Modal onClose={onClose} title="Details">
      <S.Wrapper>
        <S.PositionsWrapper>
          <S.PositionWrapper>
            <S.PositionText>Address</S.PositionText>
            <S.PositionValueLink
              onClick={() => {
                tma.webApp!.openLink(`https://tonviewer.com/${address}`)
              }}
            >
              {address.slice(0, 4) + '...' + address.slice(-4)}
            </S.PositionValueLink>
          </S.PositionWrapper>

          <S.PositionWrapper>
            <S.PositionText>Amount</S.PositionText>
            <S.PositionValue>
              {amount} {ticker} <S.PositionValueLabel>Buy</S.PositionValueLabel>
            </S.PositionValue>
          </S.PositionWrapper>

          <S.PositionWrapper>
            <S.PositionText>Date</S.PositionText>
            <S.PositionValue>
              {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </S.PositionValue>
          </S.PositionWrapper>
        </S.PositionsWrapper>
      </S.Wrapper>
    </Modal>
  )
}
