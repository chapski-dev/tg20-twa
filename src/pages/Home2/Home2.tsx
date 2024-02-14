import { useState } from 'react'
import { fromNano } from '@ton/core'
import { useQuery } from 'react-query'
import {
  getMarketplaceStats,
  getMarketplaceTokenStats,
  getTopTokensList,
  getSearchedTokensList
} from 'api'
import { useCallback, useState } from 'react'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
import { TopToken } from 'api/types'
import { SpecialOffer } from 'features/SpecialOffer'
import { useDebounce } from 'hooks/useDebounce/useDebounce'
import { Container } from 'ui/Container/Container'
import { SvgVerified } from 'ui/icons'
import { Tab } from 'ui/Tabs/Tabs'
import { Header, Stats, Tokens } from './components'
import * as S from './style'

export const Home2 = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0])

  const { data: marketplaceStats } = useQuery(['makretplaceStatsData'], () =>
    getMarketplaceStats()
  )

  const [searchedValue, setSearchedValue] = useState<string>('')

  const debauncedSearchValue = useDebounce(searchedValue)

  const { data: topTokens, isSuccess: isTopTokensLoaded } = useQuery(
    ['topTokens', currentTab.value],
    () => getTopTokensList(),
    {
      select: useCallback(
        (tokensData: TopToken[]) => {
          switch (currentTab.value) {
            case 'top':
              return tokensData
            case 'verified':
              return tokensData.filter((token) => token.verified)
            case 'new':
              return tokensData
                .filter((token) =>
                  dayjs(token.create_time).isAfter(dayjs().subtract(7, 'day'))
                )
                .sort((a, b) => dayjs(b.create_time).diff(dayjs(a.create_time)))
            case 'hot':
              return tokensData.sort((a, b) => b.supply - a.supply)
            default:
              return tokensData
          }
        },
        [currentTab.value]
      ),
    }
  )

  const updateSearchedValue = useCallback((value: string) => {
    setSearchedValue(value)
  }, [])

  const {
    data: searchedTokens,
    isLoading: isSearchedTokensLoading,
    isSuccess: isSearchedTokensLoaded,
  } = useQuery(['searchedTokens', debauncedSearchValue], () =>
    getSearchedTokensList({ query: debauncedSearchValue.toLowerCase() })

  const { data: marketplaceGramStats } = useQuery(
    ['makretplaceGramStatsData'],
    () => getMarketplaceTokenStats({ tick: 'gram' })
  )
  
  return (
    <S.Home>
      <Header
        searchValue={searchedValue}
        updateSearchValue={updateSearchedValue}
      />
      {!debauncedSearchValue && (
        <>
          <Stats
             gramFloorPrice={Number(
              fromNano(marketplaceGramStats?.floor_price || 0)
             )}
             totalVolume={marketplaceStats?.total_volume || 0}
             volume24h={marketplaceStats?.volume_24h || 0}
          />
          <SpecialOffer />
          <Container>
            <S.TabsWrapper
              containerClassName="tabs"
              onChange={setCurrentTab}
              selectedTab={currentTab}
              tabs={tabs}
            />
          </Container>
        </>
      )}

      {isTopTokensLoaded && !Boolean(debauncedSearchValue) && (
        <Tokens tokens={topTokens} />
      )}

      {Boolean(debauncedSearchValue) && isSearchedTokensLoaded && (
        <Tokens tokens={searchedTokens} />
      )}
    </S.Home>
  )
}

const tabs: Tab[] = [
  {
    label: 'Top',
    value: 'top',
  },
  {
    label: 'Verified',
    value: 'verified',
    icon: <SvgVerified />,
  },
  {
    label: 'Hot',
    value: 'hot',
  },
  {
    label: 'New',
    value: 'new',
  },
]
