import { FC, useMemo } from 'react'
import dayjs from 'dayjs'
import { SvgGramIcon, SvgToncoinIcon } from 'ui/icons'
import { shortenAddress } from 'utils/shortenAddress'
import * as S from './style'

type TransferCardProps = {
  tick: string
  amount: number
  walletAddress: string
  date: number
}

export const TransferCard: FC<TransferCardProps> = (props) => {
  const { tick, amount, walletAddress, date } = props

  const isIncrease = useMemo(() => amount > 0, [amount])

  return (
    <S.Wrapper>
      <S.TokenImageWrapper>
        {tick === 'ton' ? <SvgToncoinIcon /> : <SvgGramIcon />}
      </S.TokenImageWrapper>
      <S.ContentWrapper>
        <S.InfoWrapper>
          <S.Title>{shortenAddress(walletAddress)}</S.Title>

          <S.Label>{dayjs(date * 1000).format('YYYY/MM/DD HH:mm:ss')}</S.Label>
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.Title $type={isIncrease ? 'increase' : 'decrease'}>
            {isIncrease && '+'}
            {amount}
          </S.Title>

          <S.Label>{tick}</S.Label>
        </S.InfoWrapper>
      </S.ContentWrapper>
    </S.Wrapper>
  )
}
