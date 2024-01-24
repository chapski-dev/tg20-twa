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
  gap: 12px;
`

export const PositionWrapper = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
`

export const PositionText = styled.span`
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.hint};
`

export const PositionValue = styled.span`
  font-size: 14px;
  font-style: normal;
  line-height: 22px;
  margin: 0;
  font-weight: 500;
  padding: 0;
  color: ${({ theme }) => theme.color.text};
  font-weight: 600;
`

export const PositionValueLink = styled(PositionValue)`
  color: ${({ theme }) => theme.color.link};
`

export const PositionValueLabel = styled.span`
  background-color: #23cc5c;
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  font-weight: 400;
  margin: 0;
  padding: 1px 4px;
  border-radius: 4px;
  color: #ffffff;
`
