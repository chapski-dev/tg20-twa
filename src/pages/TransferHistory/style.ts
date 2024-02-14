import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const BalanceBlock = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  padding-bottom: 24px;
`

export const TopBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 24px;
  gap: 8px;
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BackGroundSvg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: rgba(0, 122, 255, 1);
`

export const Balance = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
`

export const DollarCount = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.hint};
`

export const FunctionalBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  gap: 24px;
`

export const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: pointer;

  &:nth-child(1) {
    svg path {
      stroke: ${({ theme }) => theme.color.btn};
    }
  }
  &:nth-child(2) {
    svg path {
      stroke: ${({ theme }) => theme.color.btn};
    }
  }

  svg path {
    fill: ${({ theme }) => theme.color.btn};
  }
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52.66px;
  height: 52.66px;
  background-color: ${({ theme }) => theme.color.bg};
  border-radius: 50%;
  border: none;
  cursor: pointer;
`

export const Text = styled.span`
  color: ${({ theme }) => theme.color.text};
  font-size: 14.18px;
  font-weight: 500;
`

export const InfoTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;

  :last-child {
    align-items: flex-end;
  }
`

export const Item = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  color: ${({ theme }) => theme.color.hint};
`

export const Count = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: ${({ theme }) => theme.color.text};
`

export const Line = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const BtnBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`
export const CheckExplorer = styled.button`
  width: 333px;
  height: 32px;
  border: 1px dotted ${({ theme }) => theme.color.hint};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.hint};
  font-size: 10px;
  font-weight: 500;
  line-height: 12px;

  :last-child {
    color: ${({ theme }) => theme.color.link};
  }
`

export const TransfersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 16px;
`

export const DateWrapper = styled(TransfersWrapper)`
  gap: 16px;
  padding: 0;
`

export const DateLabel = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: ${({ theme }) => theme.color.hint};
`
