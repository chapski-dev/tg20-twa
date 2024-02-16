import styled, { DefaultTheme } from 'styled-components'

type Status = 'success' | 'in_progress' | 'failed'

const getColorLabel = ($status: Status, theme: DefaultTheme) => {
  switch (true) {
    case $status === 'success':
      return '#6AFF70'
    case $status === 'in_progress':
      return '#FFDE6A'
    case $status === 'failed':
      return theme.color.redAlert
    default:
      return theme.color.hint
  }
}
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
export const PromoWrapper = styled.div`
  padding: 20px 16px;
  background: ${({ theme }) => theme.color.bg};

  .promo {
    width: 100%;
  }
`

export const Title = styled.div`
  font-weight: 600;
  font-size: 17px;
  line-height: 94%;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color.text};
  text-align: left;
`

export const Container = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 24px 12px;
  background: ${({ theme }) => theme.color.bg};
`

export const TopBlock = styled.div`
  padding: 36px 0 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
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
  $status?: Status
}>`
  font-size: 12px;
  font-style: normal;
  /* font-weight: ${({ $status }) => ($status ? 600 : 400)}; */
  font-weight: 600;
  line-height: 20px;
  color: ${({ theme, $status }) => $status && getColorLabel($status, theme)};
`
