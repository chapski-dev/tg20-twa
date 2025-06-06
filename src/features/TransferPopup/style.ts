import styled from 'styled-components'


export const ConfirmBlockWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const ConfirmFieldsWrapper = styled.div`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const ConfirmFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
`

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.bg};
`

export const Label = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.color.hint};
`

export const ValueLabel = styled(Label)`
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
`
