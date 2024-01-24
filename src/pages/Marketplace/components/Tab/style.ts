import styled from 'styled-components'

export const Tab = styled.div<{ active: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  color: ${({ active: isActive, theme }) =>
    isActive === 'true' ? theme.color.link : theme.color.text};
  background-color: ${({ theme }) => theme.color.bgSecondary};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  border-bottom: ${({ active: isActive, theme }) =>
    `2px solid ${isActive === 'true' ? theme.color.link : 'transparent'}`};
`
