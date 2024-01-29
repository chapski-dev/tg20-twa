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
  tabClassName?: string
  containerClassName?: string
}

export const Tabs: FC<ITabsProps> = ({
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
