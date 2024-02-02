import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  gap: 12px;
  flex-direction: column;
  width: 100%;
`

export const FieldsWrapper = styled.div`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const FieldWrapper = styled.div`
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

// export const ValueBlock = styled.div`
//   padding: 6px 12px;
//   font-size: 12px;
//   font-style: normal;
//   font-weight: 590;
//   color: ${({ theme }) => theme.color.text};
//   border-radius: 6px;
//   background-color: ${({ theme }) => theme.color.bg};
// `
