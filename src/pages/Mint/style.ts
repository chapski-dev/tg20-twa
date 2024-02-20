import styled, { DefaultTheme } from 'styled-components'
const statusColoring = (
  theme: DefaultTheme,
  status?: 'success' | 'in_progress' | 'failed'
) => {
  switch (status) {
    case 'success':
      return '#6AFF70'
    case 'in_progress':
      return '#FFDE6A'
    case 'failed':
      return theme.color.redAlert
    default:
      return theme.color.hint
  }
}
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 24px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  gap: 5px;

  .special-offer-container {
    padding: 15px;
    background-color: ${({ theme }) => theme.color.bg};
  }
`

export const TopBlock = styled.div`
  padding: 36px 0 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
`

export const Title = styled.h3`
  color: ${({ theme }) => theme.color.text};
`

export const FormWrapper = styled.div`
  border-radius: 10px;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.bg};
  width: 100%;
  gap: 15px;
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
  color: ${({ theme, $status }) => statusColoring(theme, $status)};
`

export const BannerWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.bg};
  padding: 16px;
`

export const BannerImage = styled.img`
  width: 100%;
  cursor: pointer;
`
