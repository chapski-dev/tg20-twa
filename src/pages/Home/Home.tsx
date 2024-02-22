import { useState, useCallback, useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import {
  getTopTokensList,
  getSearchedTokensList,
} from 'api'
import { TopTokenFilter } from 'api/types'
import { TransferPopup } from 'features'
import { SpecialOffer } from 'features/SpecialOffer'
import { useDebounce } from 'hooks/useDebounce/useDebounce'
import { Container } from 'ui'
import { SvgVerified } from 'ui/icons'
import type { Tab } from 'ui/Tabs/Tabs'
import { Header, Stats, Tokens } from './components'
import * as S from './style'

export const Home = () => {
  const [searchParams] = useSearchParams()
  const [currentTab, setCurrentTab] = useState(tabs[0])
  const [searchedValue, setSearchedValue] = useState('')
  const [transferPopupOpen, setTransferPopupOpen] = useState(false)
  const debauncedSearchValue = useDebounce(searchedValue)

  const { data: topTokens, isLoading: isTopTokensLoading } = useQuery(
    ['topTokens', currentTab.value],
    () => getTopTokensList(currentTab.value as TopTokenFilter)
  )
  const { data: searchedTokens, isLoading: isSearchedTokensLoading } = useQuery(
    ['searchedTokens', debauncedSearchValue],
    () => getSearchedTokensList({ query: debauncedSearchValue.toLowerCase() })
  )


  const updateSearchedValue = useCallback((value: string) => {
    setSearchedValue(value)
  }, [])

  const isLoading = useMemo(() => isSearchedTokensLoading || isTopTokensLoading, [])

  // const type = searchParams.get('type') || '';
  const tick = searchParams.get('tick') || '';
  const amount = searchParams.get('amount') || '';
  const address = searchParams.get('address') || '';
  // const from = searchParams.get('from') || '';
  const memo = searchParams.get('memo') || '';

  useEffect(() => {
    if (tick) {
      setTransferPopupOpen(true);
    };
  }, [tick]);

  return (
    <S.Home>
      <Header
        searchValue={searchedValue}
        updateSearchValue={updateSearchedValue}
      />
      {!debauncedSearchValue && (
        <>
          <Stats />
          <S.SpecialOfferBlock>
            <SpecialOffer />
          </S.SpecialOfferBlock>
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

      <Tokens
        loading={loading}
        tokens={debauncedSearchValue ? searchedTokens : topTokens}
      />
      {transferPopupOpen && (
        <TransferPopup
          address={address}
          amount={amount}
          memo={memo}
          onClose={() => setTransferPopupOpen(false)}
          tick={tick}
        />
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
