import { styled } from 'styled-components'

export const Flex = styled.div`
  padding: 16px 18px;
  border-top: 1px solid ${({ theme }) => theme.color.bgSecondary};
  background-color: ${({ theme }) => theme.color.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;

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
  .search-container {
    flex: 1;
  }
  
  .search {
    flex: 1;
    height: 40px;
    font-size: 14px;
    line-height: 16px;
  }
`

export const Notifications = styled.button<{ value: number }>`
  background-color: ${({ theme }) => theme.color.bgSecondary};
  outline: none;
  border-radius: 6px;
  border: none;
  padding: 8px;
  cursor: pointer;
  height: 40px;
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
