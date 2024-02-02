import styled from 'styled-components'
import { FormInput } from 'features/FormFields/FormInput/FormInput'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
`

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

export const Input = styled(FormInput)`
  width: 100%;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  padding: 0 18px;
  input {
    text-transform: uppercase;
    background-color: ${({ theme }) => theme.color.bgSecondary};
  }
`
