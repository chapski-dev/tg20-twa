import { styled } from 'styled-components'
import type { Theme } from './type'
import { Link } from 'react-router-dom'

export const Container = styled.div<Theme>`
  width: 257px;
  flex: 0 0 257px;
  border-radius: 10px;
  height: 75px;
  position: relative;
  padding: 9px 7px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  ${({ variant }) =>
    variant === 'purple' && 'background-color: rgba(214, 183, 255, 0.20);'}
  ${({ variant }) =>
    variant === 'yellow' && 'background-color: rgba(255, 232, 146, 0.20);'}

  #exit_1 {
    fill: ${({ theme }) => theme.color.hint};
  }

  #closeCircle {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
`

export const Img = styled.img`
  max-width: 60px;
  max-height: 60px;
`

export const Title = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 12px;
  max-width: 100px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.36px;
`
export const Subtitle = styled(Link)<Theme>`
  ${({ variant }) => variant === 'purple' && 'color: #a45fff;'}
  ${({ variant }) => variant === 'yellow' && 'color: #F69A2F;'}

  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  text-decoration: none;
  line-height: 13.526px;
  letter-spacing: -0.36px;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`
export const SubtitleWrapper = styled.div<Theme>`
  display: flex;
  align-items: center;
  gap: 2px;

  path {
    fill: ${({ variant }) => (variant === 'purple' ? '#a45fff' : '#F69A2F')};
  }
`
