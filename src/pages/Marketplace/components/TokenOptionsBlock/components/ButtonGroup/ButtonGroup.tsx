import React, { FC } from 'react';
import * as S from './style';

type ButtonGroupProps = {
  activeFilter: 'TON' | 'USD';
  onClick: () => void;
};

export const ButtonGroup: FC<ButtonGroupProps> = (props) => {
  const { onClick, activeFilter = 'TON' } = props;
  return (
    <S.ButtonGroupContainer>
      <S.Label children="Show price in" />
      <S.ButtonsWrapper>
        <S.Button
          children="TON"
          active={activeFilter === 'TON'}
          onClick={onClick}
        />
        <S.Button
          children="USD"
          active={activeFilter === 'USD'}
          onClick={onClick}
        />
      </S.ButtonsWrapper>
    </S.ButtonGroupContainer>
  );
};
