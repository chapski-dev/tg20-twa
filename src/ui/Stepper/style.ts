import styled from 'styled-components'

export const Wrapper = styled.div``

export const StepperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 16px;
`

export const Step = styled.div<{ isActive: boolean }>`
  height: 2px;
  flex: 1;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.color.btn : theme.color.bgSecondary};
`
