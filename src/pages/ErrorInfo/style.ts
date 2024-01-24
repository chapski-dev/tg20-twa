import styled from 'styled-components'
import { Button as UIButton } from 'ui/Button/Button'

export const Wrapper = styled.div`
  width: 100vw;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.bg};
  box-sizing: border-box;
`

export const TextWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 12px;
`

export const Title = styled.h5<{ $isError?: boolean }>`
  font-size: 18px;
  margin: 0;
  font-weight: 700;
  color: ${({ theme, $isError }) =>
    $isError ? theme.color.redAlert : theme.color.text};
  margin-bottom: 16px;
`

export const Label = styled.span<{ isBold?: boolean }>`
  font-size: 15px;
  font-weight: ${({ isBold }) => (isBold ? '700' : '400')};
  color: ${({ theme }) => theme.color.hint};
`

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const Button = styled(UIButton)`
  margin: 24px 0;
`
