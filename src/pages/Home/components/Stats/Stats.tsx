import { FC } from 'react'
import { fromNano } from '@ton/core'
import { useQuery } from 'react-query'
import { getMarketplaceStats, getMarketplaceTokenStats } from 'api'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators'
import * as S from './style'

type StatsBlockProps = {}

export const Stats: FC<StatsBlockProps> = (props) => {
  const { tonPrice } = useTelegram()
  const { data: marketplaceStats } = useQuery(['makretplaceStatsData'], () =>
    getMarketplaceStats()
  )
  const { data: marketplaceGramStats } = useQuery(
    ['makretplaceGramStatsData'],
    () => getMarketplaceTokenStats({ tick: 'gram' })
  )

  const gramFloorPrice = Number(fromNano(marketplaceGramStats?.floor_price || 0));
  const totalVolume = marketplaceStats?.total_volume;
  const volume24h = marketplaceStats?.volume_24h;

  return (
    <S.Wrapper>
      <S.StatItem>
        {!!(tonPrice && gramFloorPrice) ? (
          <S.Price children={`$${(tonPrice * gramFloorPrice).toFixed(7)}`} />
        ) : <S.SkeletonPrice containerClassName="skeleton-container" height={16} />}
        <S.Head>
          <S.StatText children="GRAM Price" />
        </S.Head>
      </S.StatItem>
      <S.StatItem>
        {!!(tonPrice && volume24h) ? (
          <S.Price children={`$${formatNumberWithSeparators(tonPrice * volume24h)}`} />
        ) : <S.SkeletonPrice containerClassName="skeleton-container" height={16} />}
        <S.Head>
          <S.StatText children="24h Volume" />
        </S.Head>
      </S.StatItem>
      <S.StatItem>
        {!!(tonPrice && totalVolume) ? (
          <S.Price children={` $${formatNumberWithSeparators(tonPrice * totalVolume)}`} />
        ) : <S.SkeletonPrice containerClassName="skeleton-container" height={16} />}
        <S.Head>
          <S.StatText children="Total Volume" />
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
    </S.Wrapper>
  )
}
