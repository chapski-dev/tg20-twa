import styled from 'styled-components'
import { Loader as UILoader } from 'ui/Loader/Loader'

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`
export const SkeletonTrans = styled.div`
  height: 26px;
  border-radius: 10px;
  padding: 34px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Loader = styled(UILoader)`
  width: 100%;
  height: 60vh;
`

export const DontHaveTransfersBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: ${({ theme }) => theme.color.hint};
  padding: 24px 12px;
`

export const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const DateLabel = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: ${({ theme }) => theme.color.hint};
`
