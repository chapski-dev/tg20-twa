import styled from 'styled-components'
import { DynamicTickLogo as UIDynamicTickLogo } from 'ui/DynamicTickLogo/DynamicTickLogo'
import { Loader as UILoader } from 'ui/Loader/Loader'

export const Wrapper = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.bg};
`

export const TopSelectsBlock = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px 10px 0 0;
`

export const TokenSelectContentWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  background-color: ${({ theme }) => theme.color.bg};
  border-radius: 10px 0 0 0;
  padding-left: 10px;
  width: 60%;

  svg {
    width: 20px;
    height: 20px;
  }
`

export const TokenSelectWrapper = styled.div`
  position: relative;
  height: 40px;
  width: 100%;

  &:before {
    content: '';
    position: absolute;
    right: 1rem;
    pointer-events: none;
    border-left: 0.3rem solid transparent;
    border-right: 0.3rem solid transparent;
    border-top: 0.3rem solid ${({ theme }) => theme.color.text};
    top: 45%;
    z-index: 1;
  }
`

export const TokenSelect = styled.select`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  border-radius: 10px 0 0 0;

  & option {
    background-color: ${({ theme }) => theme.color.bg};
    color: ${({ theme }) => theme.color.text};
  }
`

export const SortSelectorWrapper = styled.div`
  padding: 10px;
  min-width: 30%;
  width: 40%;
  position: relative;
  display: flex;
  background-color: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  align-items: center;
  border-radius: 10px;
  & svg path {
    stroke: ${({ theme }) => theme.color.text};
  }
`

export const VerticalLine = styled.div`
  width: 1px;
  height: 40px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const SortSelector = styled.select`
  position: absolute;
  top: 10px;
  left: 35px;
  bottom: 10px;
  width: 100px;
  height: 20px;
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  border-radius: 10px;
`

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const InfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  padding: 12px;
`

export const InfoBlockWrapper = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const Label = styled.span<{ $isAccent?: boolean }>`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.12px;
  color: ${({ theme, $isAccent }) =>
    $isAccent ? theme.color.text : theme.color.hint};
`

export const BalanceBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.12px;
  color: ${({ theme }) => theme.color.text};

  svg {
    width: 16px;
    height: 16px;
  }
`

export const ProgressBar = styled.div`
  width: 120px;
  height: 6px;
  border-radius: 39px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const ProgressLine = styled.div<{ $widthPercent: number }>`
  width: ${({ $widthPercent }) => $widthPercent}%;
  background-color: ${({ theme }) => theme.color.btn};
  height: 6px;
  border-radius: 39px;
`

export const Loader = styled(UILoader)`
  width: 100%;
  height: 216px;
`

export const DynamicTickLogo = styled(UIDynamicTickLogo)`
  min-height: 18px;
  min-width: 18px;
  width: 18px;
  height: 18px;
  font-size: 7px;
`
