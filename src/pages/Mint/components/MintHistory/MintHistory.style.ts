import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.bg};
`
export const Header = styled.div`
  padding: 20px 0;
  color: ${({ theme }) => theme.color.text}
`
export const TableRow = styled.div<{
  $even?: boolean
}>`
  flex-direction: row;
  display: flex;
  background-color: ${({ $even, theme }) =>
    $even ? theme.color.bg : theme.color.bgSecondary};
  padding: 10px;
`

export const TableCell = styled.div<{
  $status?: 'success' | 'faild' | 'pending'
}>`
  flex: 1;
  font-size: 12px;
  text-transform: ${({ $status }) => ($status ? 'capitalize' : 'none')};
  color: ${({ $status, theme }) => {
    switch ($status) {
      case 'faild':
        return theme.color.redAlert
      case 'pending':
        return '#fbbd05'
      case 'success':
        return theme.color.greenSuccess
      default:
        return theme.color.text
    }
  }};
`
export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 20px 0;
`
