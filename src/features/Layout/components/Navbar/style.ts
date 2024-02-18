import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 12px 12px 10px 12px;
  width: 100%;
  background: ${({ theme }) => theme.color.bg};
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-top: 0.9px solid ${({ theme }) => theme.color.bgSecondary};
  align-items: center;
  position: sticky;
  bottom: 0;
  z-index: 3;
  margin-top: -10px;
`

export const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  flex: 1;
  text-decoration: none;

  font-size: 10px;
  line-height: 16px;
  color: ${({ theme }) => theme.color.hint};
  svg {
    color: ${({ theme }) => theme.color.hint};
  }

  &.active {
    color: ${({ theme }) => theme.color.link};
    font-weight: 600;
    svg {
      transform: scale(1.1);
      color: ${({ theme }) => theme.color.link};
    }
  }

  &:hover {
    font-weight: 600;
    svg {
      transform: scale(1.1);
    }
  }
`
