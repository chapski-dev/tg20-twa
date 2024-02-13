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
    $isActive ? theme.color.btn : theme.color.hint};
  font-weight: ${({ $isActive }) => ($isActive ? 800 : 500)};
  cursor: ${({ $isActive }) => ($isActive ? 'auto' : 'pointer')};
  font-size: 14px;
  line-height: 16px;

  svg {
    width: 16px;
    height: 16px;

    path {
      fill: ${({ theme, $isActive }) =>
        $isActive ? theme.color.btn : theme.color.hint};
      /* stroke: ${({ theme, $isActive }) =>
        $isActive ? theme.color.link : theme.color.hint}; */
    }
  }
`
