import styled from 'styled-components'
import { Loader as UILoader } from 'ui/Loader/Loader'

export const Wrapper = styled.div`
  max-width: 100%;
  border-radius: 10px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  background-color: ${({ theme }) => theme.color.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

export const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const HeadLabel = styled.div`
  text-align: left;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  padding: 12px 0;
  line-height: normal;
  color: ${({ theme }) => theme.color.hint};
  &:last-child {
    text-align: right;
  }
`

export const RowHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 30px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const TableRow = styled.div<{ $isHeadRow?: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px 30px;
  justify-content: space-between;
  &:nth-child(even) {
    background-color: ${({ theme, $isHeadRow }) =>
      $isHeadRow ? theme.color.bg : theme.color.bgSecondary};
  }
`

export const TableData = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: ${({ theme }) => theme.color.text};

  &:last-child {
    text-align: right;
  }
`

export const Loader = styled(UILoader)`
  width: 100%;
  height: 300px;
`
