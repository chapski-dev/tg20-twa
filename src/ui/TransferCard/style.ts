import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const HistoryCard = styled.div`
  display: flex;
  flex-direction: column;
`

export const DateBlock = styled.div`
  padding-bottom: 16px;
`

export const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: ${({ theme }) => theme.color.hint};
`

export const ItemHistory = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const LeftInfo = styled.div`
  display: flex;
  gap: 5px;
`

export const SvgHistory = styled.div`
  width: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  height: 30px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  svg {
    path {
      stroke: ${({ theme }) => theme.color.hint};
    }
    width: 27px;
  }
`

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`

export const TypeHistory = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: ${({ theme }) => theme.color.text};
`

export const Adress = styled.span`
  font-size: 10px;
  font-weight: 500;
  line-height: 12px;
  color: ${({ theme }) => theme.color.hint};
`

export const CountActions = styled.div<{ isIncrease?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: ${({ theme, isIncrease }) =>
    isIncrease ? theme.color.greenSuccess : theme.color.text};
  gap: 4px;
`

export const CountTransfer = styled.span``

export const TypeСurrency = styled.span``
