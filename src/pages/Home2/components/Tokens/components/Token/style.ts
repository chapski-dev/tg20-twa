import styled from "styled-components";

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
