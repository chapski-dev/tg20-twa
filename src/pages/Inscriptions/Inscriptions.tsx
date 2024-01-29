import { ChangeEvent, FC, useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { createSearchParams, useNavigate } from 'react-router-dom'
import {
  getSearchedTokensList,
  getTopTokensList,
} from 'api'
import { AppRoutes } from 'constants/app'
import { useDebounce } from 'hooks/useDebounce/useDebounce'
import { Container } from 'ui/Container/Container'
import { Input } from 'ui/Input/Input'

import { SpecialOffer, TokenCard } from './components'
import * as S from './style'

export const Inscriptions: FC = () => {
  const [searchedValue, setSearchedValue] = useState<string>('')
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
              pathname: AppRoutes.Inscribe,
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
