import styled from 'styled-components'
import { SvgArrowRight } from 'ui/icons'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding-bottom: 5vh;
`

export const Title = styled.span`
  color: ${({ theme }) => theme.color.text};
  font-size: 26px;
font-style: normal;
font-weight: 600;
line-height: 120%; /* 31.2px */
letter-spacing: -0.26px;
`

export const Description = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  width: 80%;
  color: ${({ theme }) => theme.color.hint};
`

export const ActionLink = styled.p`
  color: ${({ theme }) => theme.color.link};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 21.6px */
  letter-spacing: -0.18px;
  gap: 10px;
  cursor: pointer;
`

export const ArrowRight = styled(SvgArrowRight)`
  color: ${({ theme }) => theme.color.link};
  width: 24px;
  height: 24px;
  transform: rotate(180deg);
`
