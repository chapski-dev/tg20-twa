import styled from 'styled-components'
import { Button } from 'ui/Button/Button'
import { Input as UIInput } from 'ui/Input/Input'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

export const Input = styled(UIInput)`
  width: 100%;
  background-color: ${({ theme }) => theme.color.bg};

  input {
    background-color: ${({ theme }) => theme.color.bg};
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
