import { styled } from 'styled-components'

export const Flex = styled.div`
  padding: 16px 17px 18px 21px;
  border-top: 1px solid ${({ theme }) => theme.color.bgSecondary};
  background-color: ${({ theme }) => theme.color.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  #Vector_6,
  #Vector_5 {
    fill: ${({ theme }) => theme.color.btn};
  }

  .tg-20 {
    margin-right: auto;
  }
  #Vector,
  #Vector_2,
  #Vector_3,
  #Vector_4 {
    fill: ${({ theme }) => theme.color.text};
  }

  .search {
    border-radius: 10px;
    width: 225px;
    height: 42px;
    font-size: 14px;
    line-height: 16px;
  }
`

export const Notifications = styled.button<{ value: number }>`
  background-color: ${({ theme }) => theme.color.bgSecondary};
  outline: none;
  border-radius: 6px;
  border: none;
  padding: 9px;
  cursor: pointer;
  height: 42px;
  &:after {
    color: ${({ theme }) => theme.color.btnText};
    background: ${({ theme }) => theme.color.btn};
    border-radius: 20px;
    width: 21px;
    height: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 10px;
    top: 10px;
    content: '${(props) => props.value}';
    position: absolute;
    z-index: 10;
  }
  #Vector,
  #Vector_2,
  #Vector_3 {
    fill: ${({ theme }) => theme.color.hint};
  }
`
