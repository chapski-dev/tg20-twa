import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  width: 100%;
`

export const PositionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  padding: 16px;
  border-radius: 6px;
`

export const PositionInfoRow = styled.div`
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
  font-weight: 500;
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
  text-transform: uppercase;
`

export const PositionValueLink = styled.span`
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

export const BlockExplorer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 41px;
  width: 100%;
  border-radius: 6px;
  border: 1px dashed ${({ theme }) => theme.color.hint};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
`
