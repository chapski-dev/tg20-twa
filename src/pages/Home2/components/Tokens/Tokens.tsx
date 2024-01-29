import { Token } from './components';
import { tokens } from './confg';
import * as S from './style';

export const Tokens = () => {

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle align='left'>Token (4)</S.HeaderTitle>
        <S.HeaderTitle align='right'>24h Volume</S.HeaderTitle>
        <S.HeaderTitle align='right'>Last Price</S.HeaderTitle>
      </S.Header>
      <S.Tokens>
        {tokens.map((token) => (
          <Token token={token} key={token.title} />
        ))}
      </S.Tokens>
    </S.Container>
  );
}