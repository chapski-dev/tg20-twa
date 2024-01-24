import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 12px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
`

export const StatBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-right: 12px;
  width: 33%;

  &:not(:first-child) {
    padding: 0 12px;
  }

  &:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.color.bg};
  }
`

export const Line = styled.div`
  width: 1px;
  height: 56px;
  background-color: ${({ theme }) => theme.color.bg};
`

export const Label = styled.span`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.12px;
  color: ${({ theme }) => theme.color.hint};
`

export const BalanceBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.12px;
  color: ${({ theme }) => theme.color.text};

  svg {
    width: 16px;
    height: 16px;
  }
`
