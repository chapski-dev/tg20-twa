import { FC, ReactElement } from 'react';
import * as S from './style';

export type Tab = {
  label: string;
  value: any;
  icon?: ReactElement;
};

type TabsProps = {
  tabs: Tab[];
  selectedTab: Tab;
  onChange: (tab: Tab) => void;
  className?: string;
};

export const Tabs: FC<TabsProps> = ({
  tabs,
  selectedTab,
  onChange,
  className,
}) => (
  <S.Wrapper className="container">
    {tabs.map((tab) => (
      <S.Tab
        key={tab.value}
        active={selectedTab.value === tab.value}
        className={className}
        onClick={() => onChange(tab)}
      >
        {tab.icon}
        {tab.label}
      </S.Tab>
    ))}
  </S.Wrapper>
);
