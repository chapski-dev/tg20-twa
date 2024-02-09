import { useState } from 'react'
import { SpecialOffer } from 'features/SpecialOffer'
import { Tabs } from 'ui'
import { Container } from 'ui/Container/Container'
import { SvgVerified } from 'ui/icons'
import { Tab } from 'ui/Tabs/Tabs'
import { Header, Stats, Tokens } from './components'
import * as S from './style'

export const Home2 = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0])
  return (
    <S.Home>
      <Header />
      <Stats />
      <SpecialOffer />
      <Container>
        <Tabs
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
