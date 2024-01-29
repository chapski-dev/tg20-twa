import { FC } from 'react'
import * as S from './style'
import { type InscribeFormType } from '../../types'

export interface ITab {
  label: string
  value: InscribeFormType
}

interface ITabsProps {
  tabs: ITab[]
  selectedTab: ITab
  onChange: (tab: ITab) => void
}

export const Tabs: FC<ITabsProps> = ({ tabs, selectedTab, onChange }) => (
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
);