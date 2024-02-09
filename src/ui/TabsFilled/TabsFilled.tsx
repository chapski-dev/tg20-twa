import { FC, ReactElement } from 'react';
import * as S from './style';

export type Tab = {
  label: string;
  value: string | number;
  icon?: ReactElement;
};

type TabsProps = {
  tabs: Tab[];
  selectedTab: Tab;
  onChange: (tab: Tab) => void;
  tabClassName?: string;
  containerClassName?: string;
};

export const TabsFilled: FC<TabsProps> = ({
  tabs,
  selectedTab,
  onChange,
  tabClassName,
  containerClassName,
}) => (
  <S.Wrapper className={containerClassName}>
    {tabs.map((tab) => (
      <S.TabItem
        key={tab.value}
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
