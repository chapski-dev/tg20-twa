import { FC } from 'react'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators'
import { stats } from './config'
import * as S from './style'
import { Chart } from '../Chart/Chart'

type StatsBlockProps = {
  totalVolume: number
  volume24h: number
  gramFloorPrice: number
}

export const Stats: FC<StatsBlockProps> = (props) => {
  const { totalVolume, volume24h, gramFloorPrice } = props

  const { tonPrice } = useTelegram()

  return (
    <S.Stats>
      <S.StatItem>
        <S.StatTitle>
          ${tonPrice && (tonPrice * gramFloorPrice).toFixed(7)}
        </S.StatTitle>
        <S.Head>
          <S.StatText>TGT Price</S.StatText>
        </S.Head>
      </S.StatItem>
      <S.StatItem>
        <S.StatTitle>
          ${tonPrice && formatNumberWithSeparators(tonPrice * volume24h)}
        </S.StatTitle>

        <S.Head>
          <S.StatText>24h Volume</S.StatText>
        </S.Head>
      </S.StatItem>
      <S.StatItem>
        <S.StatTitle>
          {' '}
          ${tonPrice && formatNumberWithSeparators(tonPrice * totalVolume)}
        </S.StatTitle>
        <S.Head>
          <S.StatText>Total Volume</S.StatText>
        </S.Head>
      </S.StatItem>
      {/* {stats.map((stat) => {
        return (
          <S.StatItem>
            <S.Head>
              <S.StatText>
                {formatNumberWithSeparators(totalVolume)}
                {formatNumberWithSeparators(volume24h)}
              </S.StatText>
              {stat.changes && (
                <Chart
                  position={stat.changes.position}
                  text={stat.changes.amount}
                />
              )}
            </S.Head>
            <S.StatText children={stat.title} />
          </S.StatItem>
        )
      })} */}
    </S.Stats>
  )
}
