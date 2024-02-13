import { FC, useMemo } from 'react'
import { SvgSendSquare } from 'ui/icons'
import { shortenAddress } from 'utils/shortenAddress'
import * as S from './style'

type TransferCardProps = {
  amount: number
  walletAddress: string
}

export const TransferCard: FC<TransferCardProps> = (props) => {
  const { amount, walletAddress } = props

  const isIncrease = useMemo(() => amount > 0, [amount])

  return (
    <S.Wrapper>
      <S.HistoryCard>
        <S.ItemHistory>
          <S.LeftInfo>
            <S.SvgHistory>
              <SvgSendSquare />
            </S.SvgHistory>
            <S.Group>
              <S.TypeHistory>Transfer</S.TypeHistory>
              <S.Adress>{shortenAddress(walletAddress)}</S.Adress>
            </S.Group>
          </S.LeftInfo>
          <S.CountActions isIncrease={isIncrease}>
            <S.CountTransfer>
              {isIncrease && '+'}
              {amount}
            </S.CountTransfer>
            <S.TypeСurrency>GRAM</S.TypeСurrency>
          </S.CountActions>
        </S.ItemHistory>
      </S.HistoryCard>
    </S.Wrapper>
  )
}
