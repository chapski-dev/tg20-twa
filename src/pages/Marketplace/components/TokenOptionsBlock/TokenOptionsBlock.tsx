import { FC, useCallback, useState } from 'react'
import { fromNano } from '@ton/core'
import { useQuery } from 'react-query'
import { getCurrentMaketplaceTicks, getMarketplaceTokenStats, getTokenInfo } from 'api'
import { MarketplaceTokenStats } from 'api/types'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgFilterIcon, SvgGramIcon, SvgLoop, SvgToncoinIcon } from 'ui/icons'
import { convertNumberToShortFormat } from 'utils/convertNumberToShortFormat'
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators'
import * as S from './style'
import { Select } from 'ui/Select/Select'
import { Button } from 'ui/Button/Button'
import { Accordion } from 'ui'
import { Input } from 'ui/Input/Input'
import { useDebounce } from 'hooks/useDebounce/useDebounce'

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
]

type TokenOptionsBlockProps = {
  onTokenChange: (tick: string) => void
  onSortSelectChange: (sortValue: string) => void
  sortSelectValue: string
  tick: string
  onListing: () => void
  listingText: string
}

export const TokenOptionsBlock: FC<TokenOptionsBlockProps> = (props) => {
  const { onTokenChange, onSortSelectChange, onListing, listingText, tick } = props

  const [searchedValue, setSearchedValue] = useState<string>("")

  const debauncedSearchValue = useDebounce(searchedValue)

  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(evt.target.value);
    console.log(debauncedSearchValue)
  }
  const { tonPrice } = useTelegram()

  const {
    data: marketPlaceTicks,
    isLoading: isMarketplaceTicksLoading,
    isSuccess: isMarketplaceTicksLoaded,
  } = useQuery(['currentMarketplaceTicks'], () => getCurrentMaketplaceTicks(), {
    select: (data: string[]) => {
      return data.map((item: string) => ({ value: item, label: item }))
    }
  })

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
              label: 'Total Volume',
              value: data.total_volume,
              description: `~ $${formatNumberWithSeparators(
                tonPrice! * data.total_volume
              )}`,
            },
            {
              label: '24H Volume',
              value: data.volume_24h,
              description: `~ $${formatNumberWithSeparators(
                tonPrice! * data.volume_24h
              )}`,
            },
            {
              label: 'Floor Price',
              value: fromNano(+data.floor_price.toFixed(0)),
              description: `~ $${(
                tonPrice! * Number(fromNano(+data.floor_price.toFixed(0)))
              ).toFixed(7)}`,
            },
            {
              label: 'Market Cap',
              value: data.market_cap,
              description: `~ $${formatNumberWithSeparators(
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
            {
              label: 'Inscription Address',
              value: currentTickData?.address,
              description: '',
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
      <S.TokenSelectContentWrapper>
        {isMarketplaceTicksLoaded && <Select onChange={(event) => onTokenChange(event.value)} options={marketPlaceTicks} />}
        <S.Button onClick={onListing}>{listingText}</S.Button>
      </S.TokenSelectContentWrapper>

      {
        isMarketplaceGramStatsLoading || isCurrentTickDataLoading ? (
          <S.Loader />
        ) : (

          <Accordion height='210px' title='Inscription Details'>
            <S.InfoWrapper>
              {marketplaceGramStats?.map(({ label, value, description }, idx) => (
                <S.InfoBlockWrapper>
                  <S.Label $isAccent>{label}</S.Label>
                  <S.BalanceBlock>
                    {idx !== marketplaceGramStats?.length - 1 ?
                      <>
                        <SvgToncoinIcon />
                        {Number(value)}
                      </>
                      :
                      <S.Link target="_blank" href={`https://tonviewer.com/${value}`}>{value}</S.Link>
                    }
                  </S.BalanceBlock>
                  <S.Label>{description}</S.Label>
                </S.InfoBlockWrapper>
              ))}
            </S.InfoWrapper>

          </Accordion>
        )
      }
      <S.StyledInput
        isSuccess={false}
        icon={<SvgLoop />}
        placeholder='Search an order'
        onChange={onChangeInput}
        value={searchedValue}
      />

      <S.Flex>
        <S.Block>
          <S.BlockTitle><span>{currentTickData?.tick}</span> Floor Price</S.BlockTitle>
          <S.BlockDescription>{`${marketplaceGramStats?.[2].value} TON ${marketplaceGramStats?.[2].description}`}</S.BlockDescription>
        </S.Block>
        <Select onChange={(event) => onSortSelectChange(event.value)} options={sortOptions} />
      </S.Flex>
    </S.Wrapper >
  )
}
