import styled from 'styled-components'
import { FormInput } from 'features/FormFields/FormInput/FormInput'
import { Button as UIButton } from 'ui/Button/Button';

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
export const Button = styled(UIButton)`
    height: 50px;
    border-radius: 6px;
    padding: 16px 30px;
    background-color: ${({ theme }) => theme.color.btn};
    color: ${({ theme }) => theme.color.btnText};
    font-weight: 600;
    font-size: 16px;
    line-height: 112%;
`