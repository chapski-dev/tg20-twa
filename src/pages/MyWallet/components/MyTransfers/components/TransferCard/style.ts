import styled from 'styled-components'

export const Wrapper = styled.div`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  gap: 12px;
`

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  &:last-child {
    align-items: flex-end;
  }
`

export const Title = styled.h4<{ $type?: 'increase' | 'decrease' }>`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.16px;
  margin: 0;
  padding: 0;
  color: ${({ theme, $type }) =>
    $type === 'increase'
      ? theme.color.greenSuccess
      : $type === 'decrease'
      ? theme.color.redAlert
      : theme.color.text};
`

export const Label = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.14px;
  color: ${({ theme }) => theme.color.hint};
`

export const TokenImageWrapper = styled.div`
  svg {
    border-radius: 50%;
    width: 44px;
    height: 44px;
  }
`
