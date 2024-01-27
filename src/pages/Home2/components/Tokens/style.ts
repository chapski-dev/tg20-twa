import { styled } from "styled-components";


export const Container = styled.div`
    padding: 0 18px 0 25px;
    display: flex;
    gap: 16px;
    flex-direction: column;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const HeaderTitle =  styled.div<{align: 'left' | 'right'}>`
    color: ${({theme}) => theme.color.hint};
    flex: 1;
    text-align: ${(props) => props.align};
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
`;

export const Box = styled.div`
    display: flex;
    gap: 45px;
    justify-content: center;
    align-items: center;
`;

export const Logo = styled.div`
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
`;

export const Tokens = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center;
    flex-direction: column;
    gap: 30px;
`;

export const Img = styled.img`
    height: 36px;
    width: 36px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;
export const Wrapper2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

export const TokenTitleWrapper = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
`;

export const TokenTitle = styled.div`
    color: ${({theme}) => theme.color.text};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
`;

export const TokenDescription = styled.div`
    color: ${({theme}) => theme.color.hint};
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
`;

export const Volume = styled.div`
    color: ${({theme}) => theme.color.text};
    text-align: right;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
`;
