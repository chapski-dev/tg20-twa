import styled from 'styled-components'
import { Loader as UILoader } from 'ui/Loader/Loader'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 0;
`

export const OrdersTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`

export const OrderRow = styled.tr<{ even: string }>`
  max-height: 50px;
  background-color: ${({ even, theme }) =>
    even === 'true' ? theme.color.bgSecondary : 'transparent'};
`

export const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  padding-top: 129px;
  background-color: ${({ theme }) => theme.color.bg};
`
export const Subtitle = styled.div`
  color: ${({ theme }) => theme.color.hint};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.42px;
`
export const Title = styled.div`
  text-align: center;
  font-size: 24px;
  color: ${({ theme }) => theme.color.hint};
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.72px;
`

export const OrderCell = styled.td`
  padding: 16px;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: ${({ theme }) => theme.color.text};
`

export const OrderActionButton = styled.div`
  display: flex;
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  color: ${({ theme }) => theme.color.redAlert};
  cursor: pointer;
`

export const OrdersHeader = styled.thead`
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const OrdersBody = styled.tbody``

export const OrdersHeaderRow = styled.tr``

export const OrdersHeaderCell = styled.th`
  padding: 12px;
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  color: ${({ theme }) => theme.color.hint};
  text-align: left;
  font-weight: 500;
`

export const EndLoader = styled(UILoader)`
  display: table-row;
  width: 100%;
  height: 50px;
`

export const ErrorText = styled.span`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  color: ${({ theme }) => theme.color.text};
`
