import { FC } from 'react';
import * as S from './SkeletonToken.style';

type SkeletonTokenProps = {}


export const SkeletonToken: FC<SkeletonTokenProps> = () => (
  <S.Wrapper>
    <S.HeroInfo>
      <div>
        <S.Logo circle />
      </div>
      <div>
        <S.Title />
        <S.Description />
      </div>
    </S.HeroInfo>
    <S.Volume />
  </S.Wrapper>
);
