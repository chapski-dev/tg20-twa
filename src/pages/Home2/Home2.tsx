import { useState, useCallback } from 'react'
import { useQuery } from 'react-query'
import {
  getTopTokensList,
  getSearchedTokensList,
} from 'api'
import { TopTokenFilter } from 'api/types'
import { SpecialOffer } from 'features/SpecialOffer'
import { useDebounce } from 'hooks/useDebounce/useDebounce'
import { Container } from 'ui/Container/Container'
import { SvgVerified } from 'ui/icons'
import { Tab } from 'ui/Tabs/Tabs'
import { Header, Stats, Tokens } from './components'
import * as S from './style'

export const Home2 = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0])

  const [searchedValue, setSearchedValue] = useState<string>('')

  const debauncedSearchValue = useDebounce(searchedValue)

  const { data: topTokens, isLoading: isTopTokensLoading } = useQuery(
    ['topTokens', currentTab.value],
    () => getTopTokensList(currentTab.value as TopTokenFilter)
  )

  const updateSearchedValue = useCallback((value: string) => {
    setSearchedValue(value)
  }, [])

  const { data: searchedTokens, isLoading: isSearchedTokensLoading } = useQuery(
    ['searchedTokens', debauncedSearchValue],
    () => getSearchedTokensList({ query: debauncedSearchValue.toLowerCase() })
  )


  const loading = isSearchedTokensLoading || isTopTokensLoading;

  return (
    <S.Home>
      <Header
        searchValue={searchedValue}
        updateSearchValue={updateSearchedValue}
      />
      {!debauncedSearchValue && (
        <>
          <Stats />
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

      {!Boolean(debauncedSearchValue) && (
        <Tokens loading={loading} tokens={topTokens || []} />
      )}

      {Boolean(debauncedSearchValue) && (
        <Tokens loading={loading} tokens={searchedTokens || []} />
      )}
    </S.Home>
  )
}

const tabs: Tab[] = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'New',
    value: 'new',
  },
  {
    label: 'Verified',
    value: 'verified',
    icon: <SvgVerified />,
  },
  {
    label: 'Volume',
    value: 'volume',
  },
  {
    label: 'Trending',
    value: 'trending',
  },
  {
    label: 'Holders',
    value: 'holders',
  },
  {
    label: 'Usage',
    value: 'usage',
  },
]
