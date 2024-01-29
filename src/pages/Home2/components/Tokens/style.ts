import { styled } from 'styled-components'

export const Container = styled.div`
  padding: 0 18px 0 25px;
  display: flex;
  gap: 16px;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const HeaderTitle = styled.div<{ align: 'left' | 'right' }>`
  color: ${({ theme }) => theme.color.hint};
  flex: 1;
  text-align: ${(props) => props.align};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`

export const Tokens = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`
