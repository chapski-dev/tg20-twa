import styled from 'styled-components'

export const WrapperGaneral = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

export const Wrapper = styled.div`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.color.bg};
`

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const ContentInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-right: 4px;
`

export const InfoWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  &:last-child {
    align-items: flex-end;
  }
`

export const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const Title = styled.h4`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.text};
`

export const Label = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  color: ${({ theme }) => theme.color.hint};
`

export const TokenImageWrapper = styled.div`
  svg {
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
`
