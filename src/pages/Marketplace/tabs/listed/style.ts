import styled from 'styled-components'
import { Loader as UILoader } from 'ui/Loader/Loader'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 18px 0;
`

export const Label = styled.span`
  font-size: 20px;
  font-style: normal;
  font-weight: 510;
  line-height: 24px;
  letter-spacing: -0.264px;
  color: ${({ theme }) => theme.color.hint};
`

export const TopBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
`

export const Title = styled.h2`
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.264px;
  color: ${({ theme }) => theme.color.text};
  max-width: 300px;
  margin: 0;
  padding: 0;
  text-align: center;
`

export const LotCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 0 16px;
`

export const Loader = styled(UILoader)`
  width: 100%;
  height: 50vh;
`

export const EndLoader = styled(UILoader)`
  width: 100%;
  height: 50px;
`

export const ErrorText = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.text};
`
