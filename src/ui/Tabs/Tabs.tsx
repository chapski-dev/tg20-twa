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
  tabClassName?: string
  containerClassName?: string
}

export const Tabs: FC<TabsProps> = ({
  tabs,
  selectedTab,
  onChange,
  tabClassName,
  containerClassName
}) => (
  <S.Wrapper className={containerClassName}>
    {tabs.map((tab) => (
      <S.TabItem
        $isActive={selectedTab.value === tab.value}
        className={tabClassName}
        onClick={() => onChange(tab)}
      >
        {tab.icon}
        {tab.label}
      </S.TabItem>
    ))}
  </S.Wrapper>
);
