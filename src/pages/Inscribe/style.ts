import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 24px;
`

export const TopBlock = styled.div`
  padding: 36px 0 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
`

export const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  color: ${({ theme }) => theme.color.text};
  text-align: center;
`

export const FormWrapper = styled.div`
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  width: 100%;
  gap: 32px;
`

export const StatusBlocks = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 12px;
`

export const StatusBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: 10px;
  padding: 12px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  margin: 24px 0;
`

export const StatusBlockLabel = styled.span<{
  $status?: 'success' | 'in_progress' | 'failed'
}>`
  font-size: 12px;
  font-style: normal;
  /* font-weight: ${({ $status }) => ($status ? 600 : 400)}; */
  font-weight: 600;
  line-height: 20px;
  color: ${({ theme, $status }) =>
    $status === 'success'
      ? '#6AFF70'
      : $status === 'in_progress'
      ? '#FFDE6A'
      : $status === 'failed'
      ? theme.color.redAlert
      : theme.color.hint};
`
