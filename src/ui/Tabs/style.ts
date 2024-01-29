import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  column-gap: 16px;
  row-gap: 8px;

  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const TabItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.text : theme.color.hint};
  cursor: ${({ $isActive }) => ($isActive ? 'auto' : 'pointer')};
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;

  svg {
    width: 16px;
    height: 16px;

    path {
      fill: ${({ theme, $isActive }) => ($isActive ? theme.color.btn : 'none')};
      stroke: ${({ theme, $isActive }) =>
        $isActive ? theme.color.text : theme.color.hint};
    }
  }
`
