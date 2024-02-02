import { ChangeEvent, FC, useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { createSearchParams, generatePath, useNavigate } from 'react-router-dom'
import {
  getSearchedTokensList,
  getTopTokensList,
} from 'api'
import { AppRoutes } from 'constants/app'
import { SpecialOffer } from 'features/SpecialOffer'
import { useDebounce } from 'hooks/useDebounce/useDebounce'
import { Tabs } from 'ui'
import { Container } from 'ui/Container/Container'
import { SvgVerified } from 'ui/icons'
import { Input } from 'ui/Input/Input'

import { Tab } from 'ui/Tabs/Tabs'
import { TokenCard } from './components'
import * as S from './style'


export const Inscriptions: FC = () => {
  const [searchedValue, setSearchedValue] = useState<string>('')
  const [currentTab, setCurrentTab] = useState<Tab>(tabs[0])

  const navigate = useNavigate()
  const debauncedSearchValue = useDebounce(searchedValue)

  const {
    data: topTokens,
    isLoading: isTopTokensLoading,
    isSuccess: isTopTokensLoaded,
  } = useQuery(['topTokens'], () => getTopTokensList())

  const {
    data: searchedTokens,
    isLoading: isSearchedTokensLoading,
    isSuccess: isSearchedTokensLoaded,
  } = useQuery(['searchedTokens', debauncedSearchValue?.toLocaleLowerCase()], () =>
    getSearchedTokensList({ query: debauncedSearchValue?.toLocaleLowerCase() })
  )

  const updateSeachedValue = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setSearchedValue(evt.target.value)
    },
    []
  )

  return (
    <S.Wrapper>
      <Container>
        <S.ExploreBlock>
          <S.Title children="Explore the big world of TG20 tokens!" />
          <S.Description
            children="With TG20 platform you can easily deploy, mint and transfer tokens based on BRC-20 standards"
          />
        </S.ExploreBlock>
      </Container>


      <Container>
        <Input
          onChange={updateSeachedValue}
          placeholder="Search tokens:"
          value={searchedValue}
        />
      </Container>
      <Container>
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
      </Container>
      <Container>
        <Tabs
          onChange={setCurrentTab}
          selectedTab={currentTab}
          tabs={tabs}
        />
      </Container>
      {isTopTokensLoading ||
        isSearchedTokensLoading ? (
        <S.Loader />
      ) : (
        <Container>
          <S.TokenCardsWrapper>
            {!debauncedSearchValue &&
              isTopTokensLoaded &&
              topTokens.slice(0, 8).map(
                ({
                  tick,
                  holders,
                  supply,
                  total_supply,
                  mintable,
                  verified,
                }) => (
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
              searchedTokens.slice(0, 8).map(
                ({
                  tick,
                  holders,
                  supply,
                  total_supply,
                  mintable,
                  verified,
                }) => (
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

            <SpecialOffer />

            {!debauncedSearchValue &&
              isTopTokensLoaded &&
              topTokens.slice(8).map(
                ({
                  tick,
                  holders,
                  supply,
                  total_supply,
                  mintable,
                  verified,
                }) => (
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
              searchedTokens.slice(8).map(
                ({
                  tick,
                  holders,
                  supply,
                  total_supply,
                  mintable,
                  verified,
                }) => (
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
        </Container>
      )}
      {isTopTokensLoaded && !topTokens.length && (
        <S.NotTokensBlock
          children="Gram20 is launching soon....."
        />
      )}
    </S.Wrapper>
  )
}

const tabs: Tab[] = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Verified',
    value: 'verified',
    icon: <SvgVerified />,
  },
  {
    label: 'Trending',
    value: 'trending',
  },
  {
    label: 'New',
    value: 'new',
  },
  {
    label: 'Minted',
    value: 'minted',
  },
  {
    label: 'Deployed',
    value: 'deployed',
  },
];
