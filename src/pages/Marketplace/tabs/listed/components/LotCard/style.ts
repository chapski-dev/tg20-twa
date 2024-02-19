import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
`

export const SkeletonLotCardWrapper = styled.div`
  height: 106px;
  border-radius: 10px;
`

export const ContentWrapper = styled.div`
  padding: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bg};
`

export const LotInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
`

export const LotPriceWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  gap: 4px;
  width: 100%;
`

export const AmountText = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22.4px;
  color: ${({ theme }) => theme.color.text};

  :last-child {
    align-items: flex-start;
  }
`

export const NumberApplication = styled.div`
  display: flex;
  align-items: center;
  height: 16px;
  border-radius: 4px;
  padding: 0 5px 0 5px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  color: ${({ theme }) => theme.color.hint};
  font-size: 10px;
  font-weight: 500;
`

export const PriceText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
  font-style: normal;
  margin: 0;
  padding: 0;
  gap: 4px;
  color: ${({ theme }) => theme.color.hint};
`

export const TitlePriceText = styled.span`
  font-size: 10px;
  font-weight: 500;
`

export const Price = styled.span`
  font-size: 12px;
  font-weight: 500;
`

export const PriceTextTon = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 12px;
`

export const PriceTextUsd = styled.div`
  color: ${({ theme }) => theme.color.hint};
  font-size: 12px;
`

export const TotalTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TotalText = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
`

export const TotalTextTitle = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.hint};
`

export const TotalInCurrencyTon = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5px;
  font-size: 14px;
  font-style: normal;
  color: ${({ theme }) => theme.color.text};
`

export const TotalInCurrencyDollar = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 16.8px;
  color: ${({ theme }) => theme.color.hint};
`

export const BuyButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 36px;
  text-align: center;
  border-radius: 6px;
  color: ${({ theme }) => theme.color.btnText};
  background-color: ${({ theme }) => theme.color.greenSuccess};
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin-top: 27px;
`
