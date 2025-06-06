import styled from 'styled-components'

export const Wrapper = styled.div`
  max-width: 100%;
  display: flex;
  align-items: flex-end;
  border-radius: 10px;
  padding: 2px;
  background-color: ${({ theme }) => theme.color.bg};
`

export const TabItem = styled.div<{ $isActive?: boolean }>`
  border-radius: 7px;
  width: 50%;
  height: 28px;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.bgSecondary : theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  cursor: ${({ $isActive }) => ($isActive ? 'auto' : 'pointer')};
  font-size: 13px;
  font-style: normal;
  font-weight: 590;
  line-height: 18px;
  letter-spacing: -0.078px;

  svg {
    width: 20px;
    height: 20px;

    path {
      stroke: ${({ theme }) => theme.color.text};
    }
  }
`