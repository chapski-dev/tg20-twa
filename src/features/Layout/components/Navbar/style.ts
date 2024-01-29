import styled from 'styled-components'

export const Container = styled.div`
  padding: 12px 12px 10px 12px;
  width: 100%;
  background: ${({ theme }) => theme.color.bg};
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-top: 1px solid ${({ theme }) => theme.color.hint};
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
  transition: all 0.5s ease;
  div {
    color: ${({ active, theme }) =>
      active ? theme.color.link : theme.color.hint};
  }
  svg path {
    stroke: ${({ active, theme }) =>
      active ? theme.color.link : theme.color.hint};
  }
  &:hover {
    div {
      color: ${({ theme }) => theme.color.link};
    }
    svg path {
      stroke: ${({ theme }) => theme.color.link};
    }
  }
`

export const Text = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.hint};
  line-height: 16px;
`
