import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`

export const Label = styled.span`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  color: ${({ theme }) => theme.color.text};
`

export const CountItemsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
`

export const CountItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  padding: 10px 25px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.color.btn : theme.color.bg};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.color.btnText : theme.color.text};
  width: 24%;
`
