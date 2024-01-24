import { FC, ReactElement } from 'react'
import * as S from './style'

export type Tab = {
  label: string
  value: string
  icon?: ReactElement
}

type TabsProps = {
  tabs: Tab[]
  selectedTab: Tab
  onChange: (tab: Tab) => void
  className?: string
}

export const Tabs: FC<TabsProps> = (props) => {
  const { tabs, selectedTab, onChange, className } = props

  return (
    <S.Wrapper className={className}>
      {tabs.map((tab) => (
        <S.TabItem
          $isActive={selectedTab.value === tab.value}
          onClick={() => onChange(tab)}
        >
          {tab.icon}
          {tab.label}
        </S.TabItem>
      ))}
    </S.Wrapper>
  )
}
