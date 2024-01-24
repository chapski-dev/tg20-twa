import styled from 'styled-components'
import { Loader as UILoader } from 'ui/Loader/Loader'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0;
`

export const OrdersTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid ${({ theme }) => theme.color.bgSecondary};
  border-radius: 10px;
`

export const OrderRow = styled.tr<{ even: string }>`
  max-height: 33px;
  background-color: ${({ even, theme }) =>
    even === 'true' ? theme.color.bgSecondary : 'transparent'};
`

export const OrderCell = styled.td`
  padding: 8px;
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
  color: ${({ theme }) => theme.color.btn};
  cursor: pointer;
`

export const OrdersHeader = styled.thead`
  background-color: ${({ theme }) => theme.color.bg};
`

export const OrdersBody = styled.tbody``

export const OrdersHeaderRow = styled.tr``

export const OrdersHeaderCell = styled.th`
  padding: 8px;
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  color: ${({ theme }) => theme.color.hint};
  text-align: left;
  font-weight: 400;

  &:first-of-type {
    border-top-left-radius: 10px;
    -moz-border-top-left-radius: 10px;
    -webkit-border-top-left-radius: 10px;
  }

  &:last-of-type {
    border-top-right-radius: 10px;
    -moz-border-top-right-radius: 10px;
    -webkit-border-top-right-radius: 10px;
  }
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
