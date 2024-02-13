import styled from 'styled-components'

export const Tab = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 8px;
  color: ${({ active, theme }) =>
    active ? theme.color.link : theme.color.hint};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  border-bottom: ${({ active, theme }) =>
    `2px solid ${active ? theme.color.link : 'transparent'}`};
`

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 0.5px solid ${({ theme }) => theme.color.bg};
`
