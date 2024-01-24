import { FC } from 'react'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgToncoinIcon } from 'ui/icons'
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators'
import * as S from './style'

type StatsBlockProps = {
  totalVolume: number
  volume24h: number
  gramFloorPrice: number
}

export const StatsBlock: FC<StatsBlockProps> = (props) => {
  const { totalVolume, volume24h, gramFloorPrice } = props

  const { tonPrice } = useTelegram()

  return (
    <S.Wrapper>
      <S.StatBlock>
        <S.Label>Total Vol</S.Label>
        <S.BalanceBlock>
          <SvgToncoinIcon /> {formatNumberWithSeparators(totalVolume)}
        </S.BalanceBlock>
        <S.Label>
          =${tonPrice && formatNumberWithSeparators(tonPrice * totalVolume)}
        </S.Label>
      </S.StatBlock>

      <S.StatBlock>
        <S.Label>24H Vol</S.Label>
        <S.BalanceBlock>
          <SvgToncoinIcon /> {formatNumberWithSeparators(volume24h)}
        </S.BalanceBlock>
        <S.Label>
          =${tonPrice && formatNumberWithSeparators(tonPrice * volume24h)}
        </S.Label>
      </S.StatBlock>

      <S.StatBlock>
        <S.Label>Floor Price</S.Label>
        <S.BalanceBlock>
          <SvgToncoinIcon /> {gramFloorPrice}
        </S.BalanceBlock>
        <S.Label>
          =${tonPrice && (tonPrice * gramFloorPrice).toFixed(7)}
        </S.Label>
      </S.StatBlock>
    </S.Wrapper>
  )
}
