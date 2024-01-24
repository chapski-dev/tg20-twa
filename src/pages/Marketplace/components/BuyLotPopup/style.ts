import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  gap: 12px;
  flex-direction: column;
  width: 100%;
`

export const FieldsWrapper = styled.div`
  position: relative;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 17px;
`

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.bg};
`

export const ValueLabel = styled.span`
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 26px;
  color: ${({ theme }) => theme.color.text};
`

export const TokenLabel = styled.span`
  background-color: ${({ theme }) => theme.color.bg};
  font-weight: 500;
  height: 28px;
  line-height: 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.text};
  border-radius: 40px;
  padding: 4px 10px 4px 10px;
`

export const ArrowDown = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.color.btn};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg path {
    stroke: ${({ theme }) => theme.color.btnText};
  }
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

export const PositionTextLabel = styled.span`
  background-color: ${({ theme }) => theme.color.bgSecondary};
  font-size: 12px;
  font-style: normal;
  line-height: 18px;
  font-weight: 400;
  margin: 0;
  padding: 1px 4px;
  border-radius: 5px;
  color: ${({ theme }) => theme.color.hint};
`
