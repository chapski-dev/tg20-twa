import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 8px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  display: flex;
  width: 100%;
  gap: 8px;
  align-items: center;
`

export const BalanceBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: rgba(35, 129, 204, 0.1);
  padding: 12px;
  border-radius: 8px;
  width: 50%;
`

export const IconWrapper = styled.div`
  border-radius: 34px;
  background: ${({ theme }) => theme.color.bgSecondary};
  box-shadow: 0px 8px 12px -8px rgba(0, 20, 38, 0.4);
  width: max-content;
  padding: 6px;

  svg {
    width: 28px;
    height: 28px;
  }
`

export const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  letter-spacing: -0.22px;
  color: ${({ theme }) => theme.color.text};
`

export const Description = styled.p`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.12px;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.hint};
`
