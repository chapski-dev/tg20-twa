import styled from 'styled-components'
import { Button } from 'ui/Button/Button'
import linia from './linia.png'

export const Wrapper = styled.div`
  padding: 8px;
  background: url(${linia}) no-repeat;
  background-position: 50% 50%;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0 36px;
  gap: 16px;
`

export const LogoWrapper = styled.div`
  svg {
    background: ${({ theme }) => theme.color.bg};
  }
`

export const Title = styled.div`
  font-size: 34px;
  line-height: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
`

export const Biggest = styled.span`
  font-weight: 800;
`

export const Description = styled.p`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 33px;
  color: ${({ theme }) => theme.color.text};
  display: flex;
  align-items: center;
  gap: 6px;
  svg {
    width: 23px;
    height: 23px;
  }
`

export const BtnWrapper = styled(Button)`
  margin-top: 10px;
  background: ${({ theme }) => theme.color.btn};
`
