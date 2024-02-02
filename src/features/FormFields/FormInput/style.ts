import styled from 'styled-components'
import { Input as UIInput } from 'ui/Input/Input'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
`

export const Input = styled(UIInput)`
  width: 100%;
  background-color: ${({ theme }) => theme.color.bgSecondary};

  input {
    background-color: ${({ theme }) => theme.color.bgSecondary};
  }
`

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.color.redAlert};
  font-weight: 500;
  font-size: 10px;
  /* line-height: 17px; */
`
