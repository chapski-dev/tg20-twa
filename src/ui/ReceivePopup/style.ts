import styled from 'styled-components'
import { Button } from 'ui'

export const WrapperModal = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
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
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const Label = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.color.hint};
  word-break: break-all;
  max-width: 220px;
`

export const CopyButton = styled(Button)`
  width: 100%;
`
