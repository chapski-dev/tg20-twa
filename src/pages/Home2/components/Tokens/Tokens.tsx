import { Token as TokenType, tokens } from './confg';
import { SvgVerify } from 'ui/icons';
import * as S from './style';
import { Chart } from '../Chart/Chart';

type TokenProps = {
    token: TokenType;
}
const Token = ({token}: TokenProps) => {
    return (
        <S.Box>
            <S.Logo>
                <S.Img src={token.logo} alt={token.title}/>
                <S.Wrapper>
                    {token.verificated && (
                        <S.TokenTitleWrapper>
                            <S.TokenTitle>{token.title}</S.TokenTitle>
                            <SvgVerify/>
                        </S.TokenTitleWrapper>    
                    )}
                    {!token.verificated && <S.TokenTitle>{token.title}</S.TokenTitle>}
                    <S.TokenDescription>{token.description}</S.TokenDescription>
                </S.Wrapper>
            </S.Logo>
            <S.Volume>{token.volume}</S.Volume>

            <S.Wrapper2>
                <S.Volume>${token.lastPrice}</S.Volume>
                <Chart position={token.chartPosition} text={token.chartText}/>
            </S.Wrapper2>
        </S.Box>
    );
}

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
                <Token token={token} key={token.title}/>
            ))}
        </S.Tokens>
    </S.Container>
  );
}