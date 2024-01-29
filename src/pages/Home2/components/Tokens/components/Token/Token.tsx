import { SvgVerify } from "ui/icons";
import * as S from './style';

import { Token as TokenType } from "./type";

import { Chart } from "../../../Chart";

type TokenProps = {
    token: TokenType;
}
export const Token = ({token}: TokenProps) => {
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
