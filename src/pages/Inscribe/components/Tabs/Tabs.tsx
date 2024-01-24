import { FC } from 'react'
import * as S from './style'
import { type InscribeFormType } from '../../types'

export type Tab = {
  label: string
  value: InscribeFormType
}

type TabsProps = {
  tabs: Tab[]
  selectedTab: Tab
  onChange: (tab: Tab) => void
}

export const Tabs: FC<TabsProps> = (props) => {
  const { tabs, selectedTab, onChange } = props

  return tabs.length > 1 ? (
    <S.Wrapper>
      {tabs.map((tab) => (
        <S.TabItem
          $isActive={selectedTab.value === tab.value}
          $itemsCount={tabs.length}
          onClick={() => onChange(tab)}
        >
          {tab.label}
        </S.TabItem>
      ))}
    </S.Wrapper>
  ) : null
}
