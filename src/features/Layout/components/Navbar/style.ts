import styled from 'styled-components'

export const Container = styled.div`
  padding: 12px 12px 10px 12px;
  width: 100%;
  background: ${({ theme }) => theme.color.bg};
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-top: 0.9px solid #ebebeb;
  align-items: center;
  position: fixed;
  bottom: 0;
  z-index: 3;
`

export const NavItem = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  flex: 1;
  font-weight: 600;
  transition: all 0.5s ease;
  div {
    color: ${({ active, theme }) =>
      active ? theme.color.link : theme.color.hint};
    font-weight: ${({ active }) => (active ? 600 : 500)};
  }
  svg path {
    stroke: ${({ active, theme }) =>
      active ? theme.color.link : theme.color.hint};
  }
  &:hover {
    div {
      color: ${({ theme }) => theme.color.link};
      font-weight: 600;
    }
    svg path {
      stroke: ${({ theme }) => theme.color.link};
    }
  }
`

export const Text = styled.div`
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.hint};
  line-height: 16px;
`
