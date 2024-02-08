import styled from 'styled-components'
import { Button as ButtonReference } from 'ui/Button/Button'

import { DynamicTickLogo as UIDynamicTickLogo } from 'ui/DynamicTickLogo/DynamicTickLogo'
import { Input } from 'ui/Input/Input'
import { Loader as UILoader } from 'ui/Loader/Loader'
import { Select } from 'ui/Select/Select'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;

  .select-container {
    margin-left: auto;
  }
`

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const BlockTitle = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.color.text};
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 16.8px */
  letter-spacing: -0.12px;

  span {
    text-transform: uppercase;
  }
`

export const BlockDescription = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.color.hint};
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 16.8px */
  letter-spacing: -0.12px;
  text-transform: uppercase;
`

export const TopSelectsBlock = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px 10px 0 0;
`

export const TokenSelectContentWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

export const SelectWrap = styled(Select)`
  color: red;
  background: ${({ theme }) => theme.color.bg};
`

export const Button = styled(ButtonReference)`
  gap: 10px;
  width: 100%;
  height: 42px;
  max-width: 170px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
  letter-spacing: -0.16px;
  margin-left: auto;
`

export const StyledInput = styled(Input)`
  margin-top: 16px;
  background: #ebebeb;
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
  gap: 8px;
  width: 100%;
`

export const Link = styled.a`
  color: ${({ theme }) => theme.color.link};
  font-size: 10px;
  font-style: normal;
  text-decoration: none;
  word-break: break-all;
  word-wrap: wrap;
  font-weight: 400;
  line-height: 120%; /* 12px */
  letter-spacing: -0.1px;
`
export const InfoBlockWrapper = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background: ${({ theme }) => theme.color.bg};
  padding: 4px 12px;
  gap: 4px;
`

export const Label = styled.span<{ $isAccent?: boolean }>`
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.1px;
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

export const ActivitiesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
