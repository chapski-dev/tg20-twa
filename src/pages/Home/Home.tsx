import { ChangeEvent, FC, useCallback, useState } from 'react'
// import { useTonAddress } from '@tonconnect/ui-react'
import { fromNano } from '@ton/core'
import { useQuery } from 'react-query'
import { createSearchParams, useNavigate } from 'react-router-dom'
import {
  getMarketplaceStats,
  getMarketplaceTokenStats,
  getSearchedTokensList,
  getTopTokensList,
} from 'api'
import { AppRoutes } from 'constants/app'
import { MainButton } from 'features/MainButton'
import { useDebounce } from 'hooks/useDebounce/useDebounce'
import { Container } from 'ui/Container/Container'
import { Input } from 'ui/Input/Input'
import { TokenCard, StatsBlock } from './components'

import * as S from './style'

export const Home: FC = () => {
  const [searchedValue, setSearchedValue] = useState<string>('')

  const debauncedSearchValue = useDebounce(searchedValue)

  const navigate = useNavigate()

  // const { webApp } = useTelegram()

  const {
    data: topTokens,
    isLoading: isTopTokensLoading,
    isSuccess: isTopTokensLoaded,
  } = useQuery(['topTokens'], () => getTopTokensList('all'))

  const {
    data: marketplaceStats,
    isLoading: isMarketplaceStatsLoading,
    isSuccess: isMarketplaceStatsLoaded,
  } = useQuery(['makretplaceStats'], () => getMarketplaceStats())

  const {
    data: marketplaceGramStats,
    isLoading: isMarketplaceGramStatsLoading,
    isSuccess: isMarketplaceGramStatsLoaded,
  } = useQuery(['makretplaceGramStats'], () =>
    getMarketplaceTokenStats({ tick: 'gram' })
  )

  const {
    data: searchedTokens,
    isLoading: isSearchedTokensLoading,
    isSuccess: isSearchedTokensLoaded,
  } = useQuery(['searchedTokens', debauncedSearchValue], () =>
    getSearchedTokensList({ query: debauncedSearchValue })
  )

  const handleLinkClick = () => {
    // webApp.disableClosingConfirmation()
    // webApp.openTelegramLink(TG_COMMUNITY_LINK)
    navigate(AppRoutes.Marketplace)
  }

  const updateSeachedValue = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setSearchedValue(evt.target.value)
    },
    []
  )

  console.log(topTokens)

  return (
    <S.Wrapper>
      <Container>
        <S.ExploreBlock>
          <S.Title>
            Explore the world <br />
            of GRAM-20 tokens
          </S.Title>
          <S.Description>
            With GRAM-20 platform you can easily deploy, mint and transfer
            tokens based on BRC-20 standards.
          </S.Description>
          <S.Link onClick={handleLinkClick}>
            Explore marketplace
            <S.LinkArrow />
          </S.Link>
        </S.ExploreBlock>
      </Container>

      {isMarketplaceStatsLoaded && isMarketplaceGramStatsLoaded && (
        <StatsBlock
          gramFloorPrice={Number(fromNano(marketplaceGramStats.floor_price))}
          totalVolume={marketplaceStats.total_volume}
          volume24h={marketplaceStats.volume_24h}
        />
      )}

      <Container>
        <Input
          onChange={updateSeachedValue}
          placeholder="Search:"
          value={searchedValue}
        />
      </Container>

      {isTopTokensLoading ||
      isMarketplaceStatsLoading ||
      isMarketplaceGramStatsLoading ||
      isSearchedTokensLoading ? (
        <S.Loader />
      ) : (
        <>
          <Container>
            <S.TokenCardsWrapper>
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
                  Deploy your token
                </S.DeployInfoBlock>
                <S.ArrowIcon />
              </S.DeployTokenBlock>

              {!debauncedSearchValue &&
                isTopTokensLoaded &&
                topTokens.map(
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
                searchedTokens.map(
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

              {isTopTokensLoaded && !topTokens.length && (
                <S.NotTokensBlock>
                  Gram20 is launching soon.....
                </S.NotTokensBlock>
              )}
            </S.TokenCardsWrapper>
          </Container>
        </>
      )}

      <MainButton
        onClick={() => navigate(AppRoutes.Marketplace)}
        text="Marketplace"
      />
    </S.Wrapper>
  )
}
