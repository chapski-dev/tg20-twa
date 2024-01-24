import styled from 'styled-components'
import { Loader as UILoader } from 'ui/Loader/Loader'

export const Wrapper = styled.div`
  max-width: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 12px;
`

export const Table = styled.table`
  table-layout: auto;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`

export const TableHeadLabel = styled.th`
  text-align: left;
  font-size: 17px;
  font-style: normal;
  font-weight: 590;
  line-height: normal;
  color: ${({ theme }) => theme.color.hint};
  padding: 10px;

  &:last-child {
    text-align: right;
  }
`

export const TableRow = styled.tr<{ $isHeadRow?: boolean }>`
  &:nth-child(odd) {
    background-color: ${({ theme, $isHeadRow }) =>
      $isHeadRow ? theme.color.bg : theme.color.bgSecondary};
  }
`

export const TableData = styled.td`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${({ theme }) => theme.color.text};
  padding: 10px;

  &:last-child {
    text-align: right;
  }
`

export const Loader = styled(UILoader)`
  width: 100%;
  height: 300px;
`
