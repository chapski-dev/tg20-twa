import { useState } from 'react'
import { fromNano } from '@ton/core'
import { useQuery } from 'react-query'
import {
  getMarketplaceStats,
  getMarketplaceTokenStats,
  getTopTokensList,
} from 'api'
import { SpecialOffer } from 'features/SpecialOffer'
import { Tabs } from 'ui'
import { Container } from 'ui/Container/Container'
import { SvgVerified } from 'ui/icons'
import { Tab } from 'ui/Tabs/Tabs'
import { Header, Stats, Tokens } from './components'
import * as S from './style'

export const Home2 = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0])
  const { data: topTokens } = useQuery(['topTokensData'], () =>
    getTopTokensList()
  )

  const { data: marketplaceStats } = useQuery(['makretplaceStatsData'], () =>
    getMarketplaceStats()
  )

  const { data: marketplaceGramStats } = useQuery(
    ['makretplaceGramStatsData'],
    () => getMarketplaceTokenStats({ tick: 'gram' })
  )

  return (
    <S.Home>
      <Header />
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
      <Tokens />
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
  {
    label: 'Gainers',
    value: 'gainers',
  },
]
