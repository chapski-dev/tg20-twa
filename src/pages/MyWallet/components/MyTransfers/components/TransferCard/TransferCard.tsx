import { FC, useMemo } from 'react'
import dayjs from 'dayjs'
import { SvgGramIcon, SvgSendSquare, SvgToncoinIcon } from 'ui/icons'
import { shortenAddress } from 'utils/shortenAddress'
import * as S from './style'

type TransferCardProps = {
  amount: number
  walletAddress: string
  date: number
}

export const TransferCard: FC<TransferCardProps> = (props) => {
  const { amount, walletAddress, date } = props

  const isIncrease = useMemo(() => amount > 0, [amount])

  return (
    <S.Wrapper>
      <S.HistoryBlock>
        <S.HistoryCard>
          <S.DateBlock>
            <S.Date>{dayjs(date * 1000).format(' MMMM DD YYYY')}</S.Date>
          </S.DateBlock>
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
            <S.CountActions>
              <S.CountTransfer>
                {isIncrease && '+'}
                {amount}
              </S.CountTransfer>
              <S.TypeСurrency>GRAM</S.TypeСurrency>
            </S.CountActions>
          </S.ItemHistory>
        </S.HistoryCard>
      </S.HistoryBlock>
    </S.Wrapper>
  )
}
