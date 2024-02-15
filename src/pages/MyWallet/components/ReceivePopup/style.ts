import styled from 'styled-components'

export const WrapperModal = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin-top: -20px;
`

export const TitleModal = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text};
`

export const QrCodeWrapper = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  border-radius: 12px;
`

export const CopyBtn = styled.div``
