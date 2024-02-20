import { ChangeEvent, FC, useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { getSearchedTokensList, getTopTokensList } from 'api'
import { TopTokenFilter } from 'api/types'
import { AppRoutes } from 'constants/app'
import { SpecialOffer } from 'features/SpecialOffer'
import { useDebounce } from 'hooks/useDebounce/useDebounce'
import { Tabs } from 'ui'
import { SvgCoinsSet, SvgLoop, SvgVerified } from 'ui/icons'
import { Input } from 'ui/Input/Input'
import { Tab } from 'ui/Tabs/Tabs'
import { TokenCard } from './components'
import { SkeletonTokenCard } from './components/TokenCard/TokenCard'
import * as S from './style'

export const Inscriptions: FC = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [searchedValue, setSearchedValue] = useState<string>('')
  const debauncedSearchValue = useDebounce(searchedValue)

  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get('tab');

  const [currentTab, setCurrentTab] = useState<Tab>(
    initialTab && tabs[initialTab] ? tabs[initialTab] : tabs.all
  );

  const handleSetCurrentTab = (tab: Tab) => {
    if (currentTab.value !== tab.value) {
      setCurrentTab(tab);
      navigate({
        pathname: AppRoutes.Inscriptions,
        search: createSearchParams({ tab: tab.value?.toString() }).toString(),
      });
    }
  }


  const {
    data: topTokens,
    isLoading: isTopTokensLoading,
    isSuccess: isTopTokensLoaded,
  } = useQuery(['topTokens', currentTab.value], () =>
    getTopTokensList(currentTab.value as TopTokenFilter)
  )

  const {
    data: searchedTokens,
    isLoading: isSearchedTokensLoading,
    isSuccess: isSearchedTokensLoaded,
  } = useQuery(
    ['searchedTokens', debauncedSearchValue?.toLocaleLowerCase()],
    () =>
      getSearchedTokensList({
        query: debauncedSearchValue?.toLocaleLowerCase(),
      })
  )

  const updateSeachedValue = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      if (currentTab.value !== 'all') {
        setCurrentTab(tabs.all)
      }

      setSearchedValue(evt.target.value)
    },
    [currentTab.value]
  )

  const loading = isSearchedTokensLoading || isTopTokensLoading

  return (
    <S.Wrapper>
      {!debauncedSearchValue && (
        <S.ExploreBlock>
          <S.InfoBlock>
            <S.Title children="Explore the big world of TG20 tokens!" />
            <S.Description children="With TG20 platform you can easily deploy, mint and transfer tokens based on BRC-20 standards." />
          </S.InfoBlock>
          <S.IconsBlock>
            <SvgCoinsSet />
          </S.IconsBlock>
        </S.ExploreBlock>
      )}
      <S.InputWrapper>
        <Input
          icon={<SvgLoop />}
          isSearchInput={false}
          onChange={updateSeachedValue}
          placeholder="Search tokens"
          value={searchedValue}
        />
      </S.InputWrapper>
      {!debauncedSearchValue && (
        <>
          <S.InputWrapper>

            <S.DeployTokenBlock
              onClick={() =>
                navigate({
                  pathname: AppRoutes.Deploy,
                  search: createSearchParams({
                    from: 'home',
                    type: 'deploy',
                  }).toString(),
                })
              }
            >
              <S.DeployInfoBlock>
                <S.DeployIcon />
                Deploy new inscription
              </S.DeployInfoBlock>
              <S.ArrowIcon />
            </S.DeployTokenBlock>
          </S.InputWrapper>

          <Tabs
            onChange={handleSetCurrentTab}
            selectedTab={currentTab}
            tabs={Object.values(tabs)}
          />
        </>
      )}

      <S.TokenCardsWrapper>
        {loading && [1, 2, 3, 4].map(() => <SkeletonTokenCard />)}
        {!debauncedSearchValue &&
          isTopTokensLoaded &&
          topTokens
            .slice(0, 8)
            .map((token, i) => <TokenCard key={i} {...token} />)}

        {Boolean(debauncedSearchValue) &&
          isSearchedTokensLoaded &&
          searchedTokens
            .slice(0, 8)
            .map(
              ({ tick, holders, supply, total_supply, mintable, verified }) => (
                <TokenCard
                  key={tick}
                  holders={holders}
                  mintable={mintable}
                  supply={supply}
                  tick={tick}
                  total_supply={total_supply}
                  verified={verified}
                />
              )
            )}

        {!debauncedSearchValue && <SpecialOffer />}

        {!debauncedSearchValue &&
          isTopTokensLoaded &&
          topTokens
            .slice(8)
            .map(
              ({ tick, holders, supply, total_supply, mintable, verified }) => (
                <TokenCard
                  key={tick}
                  holders={holders}
                  mintable={mintable}
                  supply={supply}
                  tick={tick}
                  total_supply={total_supply}
                  verified={verified}
                />
              )
            )}

        {Boolean(debauncedSearchValue) &&
          isSearchedTokensLoaded &&
          searchedTokens
            .slice(8)
            .map(
              ({ tick, holders, supply, total_supply, mintable, verified }) => (
                <TokenCard
                  key={tick}
                  holders={holders}
                  mintable={mintable}
                  supply={supply}
                  tick={tick}
                  total_supply={total_supply}
                  verified={verified}
                />
              )
            )}
      </S.TokenCardsWrapper>
      {isTopTokensLoaded && !topTokens.length && (
        <S.NotTokensBlock children="Gram20 is launching soon....." />
      )}
    </S.Wrapper>
  )
}

const tabs: {
  [x: string]: Tab
} = {
  all: {
    label: 'All',
    value: 'all',
  },
  new: {
    label: 'New',
    value: 'new',
  },
  verified: {
    label: 'Verified',
    value: 'verified',
    icon: <SvgVerified />,
  },
  volume: {
    label: 'Volume',
    value: 'volume',
  },
  trending: {
    label: 'Trending',
    value: 'trending',
  },
  holders: {
    label: 'Holders',
    value: 'holders',
  },
};