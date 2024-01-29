import styled from 'styled-components'
import { ChartPosition } from './types'

export const Container = styled.div<{ position: ChartPosition }>`
  display: flex;
  align-items: center;

  & svg path {
    fill: ${({ position, theme }) =>
      position === 'up' ? theme.color.greenSuccess : theme.color.redAlert};
  }

  & div {
    color: ${({ position, theme }) =>
      position === 'up' ? theme.color.greenSuccess : theme.color.redAlert};
  }
`

export const Text = styled.p`
  font-size: 10px;
  font-weight: 600;
  line-height: 16px;
`
