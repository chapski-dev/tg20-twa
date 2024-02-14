import { FC, useMemo } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import { SvgSendSquare } from 'ui/icons'
import { shortenAddress } from 'utils/shortenAddress'
import * as S from './style'

type TransferCardProps = {
  amount: number
  walletAddress: string
  tick: string
  hash: string
}

export const TransferCard: FC<TransferCardProps> = (props) => {
  const { amount, walletAddress, tick, hash } = props

  const navigate = useNavigate()

  const isIncrease = useMemo(() => amount > 0, [amount])

  const handleClick = () => {
    const path = generatePath(AppRoutes.TransferDetailed, { hash: btoa(hash) })
    navigate(path)
  }

  return (
    <S.Wrapper onClick={handleClick}>
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
            <S.TypeСurrency>{tick.toUpperCase()}</S.TypeСurrency>
          </S.CountActions>
        </S.ItemHistory>
      </S.HistoryCard>
    </S.Wrapper>
  )
}
