import styled from 'styled-components'
import { FormInput as Input } from 'features/FormFields/FormInput/FormInput'

export const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  gap: 12px;
  flex-direction: column;
  width: 100%;
`

export const FieldWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  gap: 4px;
`

export const FieldInputInnerContentWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
`

export const InnerContentText = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.color.hint};
`

export const InnerToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`

export const InnerToggleOption = styled.div<{ active: boolean }>`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  padding: 4px 8px 4px 8px;
  border-radius: 5px;
  color: ${({ theme, active }) =>
    active ? theme.color.btnText : theme.color.text};
  background-color: ${({ theme, active }) =>
    active ? theme.color.btn : theme.color.bg};
`

export const FieldLabelWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const FieldLabel = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.color.hint};
`

export const FieldSecondaryLabel = styled.span`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.color.hint};
`

export const FieldSecondaryLabelLink = styled.span`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.color.link};
  cursor: pointer;
`

export const PositionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const PositionWrapper = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
`

export const PositionText = styled.span`
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.hint};
`

export const PositionValue = styled.span`
  font-size: 14px;
  font-style: normal;
  line-height: 22px;
  margin: 0;
  font-weight: 500;
  padding: 0;
  color: ${({ theme }) => theme.color.text};
  font-weight: 600;
`

export const PositionTextLabel = styled.span`
  background-color: ${({ theme }) => theme.color.bgSecondary};
  font-size: 12px;
  font-style: normal;
  line-height: 18px;
  font-weight: 400;
  margin: 0;
  padding: 1px 4px;
  border-radius: 5px;
  color: ${({ theme }) => theme.color.hint};
`

export const FormInput = styled(Input)`
  height: 44px;
  padding-right: 8px;
  background-color: ${({ theme }) => theme.color.bgSecondary};

  input {
    background-color: ${({ theme }) => theme.color.bgSecondary};
  }
`