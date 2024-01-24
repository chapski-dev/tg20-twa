import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${({ theme }) => theme.color.bg};
`

export const Line = styled.div<{ $widthPercent: number }>`
  width: ${({ $widthPercent }) => $widthPercent}%;
  background-color: ${({ theme }) => theme.color.btn};
  height: 6px;
`
