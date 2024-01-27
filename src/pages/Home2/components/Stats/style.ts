import styled from "styled-components";

export const Stats = styled.div`
    background: linear-gradient(90deg, rgba(0, 152, 234, 0.60) 0%, rgba(0, 102, 255, 0.60) 100%);
    padding: 20px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

export const StatItem = styled.div`
    background: ${({theme}) => theme.color.bg};
    border-radius: 6px;
    padding: 15px 10px 7px 7px;
    display: flex;
    width: 115px;
    flex-direction: column;
`;

export const StatTitle = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: ${({theme}) => theme.color.text};
    line-height: 16px;
`;

export const StatText = styled.div`
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: ${({theme}) => theme.color.hint};
`;

export const Head = styled.div`
    display: flex;
    align-items: flex-end;
`;