import styled from "styled-components";

export const Container = styled.div<{position: 'up' | 'down'}>`
    display: flex;
    align-items: center;

    & svg path {
      fill: ${(props) => props.position === 'up' ? props.theme.color.greenSuccess : props.theme.color.redAlert};

    }

    & div {
        color: ${(props) => props.position === 'up' ? props.theme.color.greenSuccess : props.theme.color.redAlert}
    }
`;

export const Text = styled.div`
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
`