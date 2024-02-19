import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const StepperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
`

export const Step = styled.div<{ isActive: boolean }>`
  height: 2px;
  flex: 1;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.color.btn : theme.color.bgSecondary};
`

export const Label = styled.span`
  color: ${({ theme }) => theme.color.text};
  font-size: 14px;
  font-weight: 400;
`
