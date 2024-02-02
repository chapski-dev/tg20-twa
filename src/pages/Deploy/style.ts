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
  padding: 16px 16px 4px;
  background: ${({ theme }) => theme.color.bgSecondary};
  padding-top: 24px;
  height: 100%;
`
export const PromoWrapper = styled.div`
  padding: 20px 16px;
  background: ${({ theme }) => theme.color.bg};

  .promo {
    width: 100%;
    height: 83px;
  }
`

export const TitleDeploy = styled.div`
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
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.bg};
  width: 100%;
  gap: 24px;

  .button {
    height: 50px;
    border-radius: 6px;
    padding: 16px 30px;
    background-color: ${({ theme }) => theme.color.btn};
    color: ${({ theme }) => theme.color.btnText};
    font-weight: 600;
    font-size: 16px;
    line-height: 112%;
  }
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
