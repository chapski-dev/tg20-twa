import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
`

export const ContentWrapper = styled.div`
  padding: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const LotInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
`

export const LotPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const AmountText = styled.span`
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.text};
`

export const PriceText = styled.span`
  font-size: 14px;
  font-style: normal;
  line-height: 22px;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.hint};
`

export const TotalText = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const TotalInCurrencyText = styled.div`
  font-size: 16px;
  font-style: normal;
  line-height: 22px;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.text};
  display: flex;
  align-items: center;
  gap: 6px;
`

export const BuyButton = styled.div`
  border-radius: 10px;
  padding: 6px 24px;
  background-color: ${({ theme }) => theme.color.btn};
  color: ${({ theme }) => theme.color.btnText};
  cursor: pointer;
`
