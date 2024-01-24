import { FC, useCallback } from 'react'
import { fromNano } from '@ton/core'
import { useQuery } from 'react-query'
import { getMarketplaceTokenStats, getTokenInfo } from 'api'
import { MarketplaceTokenStats } from 'api/types'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgFilterIcon, SvgGramIcon, SvgToncoinIcon } from 'ui/icons'
import { convertNumberToShortFormat } from 'utils/convertNumberToShortFormat'
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators'
import * as S from './style'

const LISTED_TOKENS = [
  'gram',
  'tono',
  'leet',
  'rare',
  'nano',
  'pepe',
  'lmao',
  'fomo',
  'tele',
]

const sortOptions = [
  {
    label: 'Created at (desc)',
    value: 'created_at_desc',
  },
  {
    label: 'Created at (asc)',
    value: 'created_at_asc',
  },
  {
    label: 'Price (desc)',
    value: 'price_per_unit_desc',
  },
  {
    label: 'Price (asc)',
    value: 'price_per_unit_asc',
  },
  {
    label: 'Amount (desc)',
    value: 'amount_desc',
  },
  {
    label: 'Amount (asc)',
    value: 'amount_asc',
  },
  {
    label: 'Total (desc)',
    value: 'total_cost_desc',
  },
  {
    label: 'Total (asc)',
    value: 'total_cost_asc',
  },
  // {
  //   label: 'Sold at (desc)',
  //   value: 'closed_at_desc',
  // },
  // {
  //   label: 'Sold at (asc)',
  //   value: 'closed_at_asc',
  // },
]

type TokenOptionsBlockProps = {
  onTokenChange: (tick: string) => void
  onSortSelectChange: (sortValue: string) => void
  sortSelectValue: string
  tick: string
}

export const TokenOptionsBlock: FC<TokenOptionsBlockProps> = (props) => {
  const { onTokenChange, onSortSelectChange, sortSelectValue, tick } = props

  const { tonPrice } = useTelegram()

  const { data: currentTickData, isLoading: isCurrentTickDataLoading } =
    useQuery(['currentStatsTokenTickDatad', tick], () => getTokenInfo(tick), {
      enabled: !!tick,
    })

  const {
    data: marketplaceGramStats,
    isLoading: isMarketplaceGramStatsLoading,
  } = useQuery(
    ['makretplaceTokenStats', tick, tonPrice, currentTickData],
    () => getMarketplaceTokenStats({ tick }),
    {
      select: useCallback(
        (data: MarketplaceTokenStats) => {
          return [
            {
              label: 'Total Vol',
              value: data.total_volume,
              description: `=$${formatNumberWithSeparators(
                tonPrice! * data.total_volume
              )}`,
            },
            {
              label: '24H Vol',
              value: data.volume_24h,
              description: `=$${formatNumberWithSeparators(
                tonPrice! * data.volume_24h
              )}`,
            },
            {
              label: 'Floor Price',
              value: fromNano(+data.floor_price.toFixed(0)),
              description: `=$${(
                tonPrice! * Number(fromNano(+data.floor_price.toFixed(0)))
              ).toFixed(7)}`,
            },
            {
              label: 'Market Cap',
              value: data.market_cap,
              description: `=$${formatNumberWithSeparators(
                tonPrice! * data.market_cap
              )}`,
            },
            {
              label: 'Holders',
              value: currentTickData?.holders,
              description: `${convertNumberToShortFormat(
                data.total_operations
              )} transactions`,
            },
          ]
        },
        [currentTickData?.holders, tonPrice]
      ),
      enabled: !!tick && !!tonPrice && !!currentTickData?.holders,
    }
  )

  return (
    <S.Wrapper>
      <S.TopSelectsBlock>
        <S.TokenSelectContentWrapper>
          {/* {tick === 'gram' ? (
            <SvgGramIcon />
          ) : (
            <S.DynamicTickLogo tick={tick} />
          )} */}
          <SvgGramIcon />
          <S.TokenSelectWrapper>
            <S.TokenSelect onChange={(evt) => onTokenChange(evt.target.value)}>
              {LISTED_TOKENS.map((token) => (
                <option key={token} value={token}>
                  {token.toUpperCase()}
                </option>
              ))}
            </S.TokenSelect>
          </S.TokenSelectWrapper>
        </S.TokenSelectContentWrapper>

        <S.VerticalLine />

        <S.SortSelectorWrapper>
          <SvgFilterIcon
            style={{
              width: 20,
              height: 20,
              zIndex: 1,
            }}
          />
          <S.SortSelector
            onChange={(evt) => onSortSelectChange(evt.target.value)}
            value={sortSelectValue}
          >
            <option disabled value="">
              Sort
            </option>
            {sortOptions.map(({ value, label }, idx) => (
              <option key={idx} value={value}>
                {label}
              </option>
            ))}
          </S.SortSelector>
        </S.SortSelectorWrapper>
      </S.TopSelectsBlock>

      <S.Line />

      {isMarketplaceGramStatsLoading || isCurrentTickDataLoading ? (
        <S.Loader />
      ) : (
        <S.InfoWrapper>
          {marketplaceGramStats?.map(({ label, value, description }, idx) => (
            <S.InfoBlockWrapper>
              <S.Label>{label}</S.Label>
              <S.BalanceBlock>
                {idx !== marketplaceGramStats?.length - 1 && <SvgToncoinIcon />}
                {Number(value)}
              </S.BalanceBlock>
              <S.Label>{description}</S.Label>
            </S.InfoBlockWrapper>
          ))}

          <S.InfoBlockWrapper>
            <S.Label>Progress</S.Label>
            <S.Label $isAccent>100%</S.Label>
            <S.ProgressBar>
              <S.ProgressLine $widthPercent={100} />
            </S.ProgressBar>
          </S.InfoBlockWrapper>
        </S.InfoWrapper>
      )}
    </S.Wrapper>
  )
}
