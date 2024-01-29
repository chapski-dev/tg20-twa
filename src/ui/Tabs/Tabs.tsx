import { FC, ReactElement } from 'react'
import * as S from './style'

export interface ITab {
  label: string
  value: string
  icon?: ReactElement
}

interface ITabsProps {
  tabs: ITab[]
  selectedTab: ITab
  onChange: (tab: ITab) => void
  className?: string
}

export const Tabs: FC<ITabsProps> = ({
  tabs,
  selectedTab,
  onChange,
  className
}) => (
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
);
