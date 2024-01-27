import { styled } from "styled-components";

export const Flex = styled.div`
  padding: 16px 17px 18px 21px;
  border-top: 1px solid ${({theme}) => theme.color.bgSecondary};
  background-color: ${({theme}) => theme.color.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`

export const Search = styled.input`
    padding: 11px 12px;
    border-radius: 6px;
    border: none;
    background-color: ${({theme}) => theme.color.bgSecondary};
    color: ${({theme}) => theme.color.hint};
    &:before {
        content: "";
        background:url('assets/icons/search.svg');
        width: 18px;
        height: 18px;
    }
    &:focus {
        border: none;
        outline: none;
    }
`

export const Notifications = styled.button<{value: number}>`
    background-color: ${({theme}) => theme.color.bgSecondary};
    outline: none;
    border-radius: 6px;
    border: none;
    padding: 9px;
    cursor: pointer;
    &:after {
        color: ${({theme}) => theme.color.btnText};
        background: ${({theme}) => theme.color.btn};
        border-radius: 20px;
        width: 21px;
        height: 21px;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 15px;
        top: 10px;
        content: "${(props) => props.value}";
        position: absolute;
        z-index: 10;
    }
`