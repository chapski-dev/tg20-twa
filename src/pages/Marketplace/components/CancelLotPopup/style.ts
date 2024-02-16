import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  gap: 12px;
  flex-direction: column;
  width: 100%;
`

export const PositionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const PositionWrapper = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding: 22px 12px;
  background: ${({ theme }) => theme.color.bgSecondary};
  &:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`

export const PositionText = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.01em;
  text-align: left;

  color: ${({ theme }) => theme.color.hint};
`

export const PositionValue = styled(PositionText)`
  text-align: left;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
`
