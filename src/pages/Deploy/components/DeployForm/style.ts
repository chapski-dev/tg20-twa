import styled from 'styled-components'
import { Button } from 'ui/Button/Button'
import { Input as UIInput } from 'ui/Input/Input'

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.bg};
  width: 100%;
  gap: 24px;

  .button {
    height: 50px;
    border-radius: 6px;
    padding: 16px 30px;
    background-color: ${({ theme }) => theme.color.btn};
    color: ${({ theme }) => theme.color.btnText};
    font-weight: 600;
    font-size: 16px;
    line-height: 112%;
  }
`

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bg};
`

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

export const Input = styled(UIInput)`
  width: 100%;
  background-color: ${({ theme }) => theme.color.greenSuccess};

  input {
    background-color: ${({ theme }) => theme.color.bgSecondary};
  }
`

export const SubmitButton = styled(Button)`
  border-radius: 130px;
  color: #fff;
  margin: 0 auto;
  padding: 11px 0;
  width: 264px;
  background: linear-gradient(90deg, #0098ea 0%, #0057ff 100%);
  margin: 41px auto 26px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 2.1px;
`
