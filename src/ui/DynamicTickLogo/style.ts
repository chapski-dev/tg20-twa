import styled from 'styled-components'
import { generateTickLogoGradient } from 'utils/generateTickLogoGradient'

export const Wrapper = styled.div<{ $tick: string }>`
  min-width: 38px;
  min-height: 38px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  font-weight: 700;
  background: ${({ $tick }) => generateTickLogoGradient($tick)};
  color: #fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`
