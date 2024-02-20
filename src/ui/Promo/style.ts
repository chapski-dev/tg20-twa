import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import type { Theme } from './type'

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
    variant === 'purple' && 'background-color: rgba(245, 242, 251, 1);'}
  ${({ variant }) =>
    variant === 'yellow' && 'background-color: rgba(254, 249, 230, 1);'}
  ${({ variant }) =>
    variant === 'blue' && 'background-color: rgba(238, 247, 255, 1);'}

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
  font-size: 12px;
  max-width: 100px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`
export const Subtitle = styled(Link)<Theme>`
  ${({ variant }) => variant === 'purple' && 'color: #a45fff;'}
  ${({ variant }) => variant === 'yellow' && 'color: #F69A2F;'}
  ${({ variant }) => variant === 'blue' && 'color: #007AFF'}

  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  text-decoration: none;
  line-height: 13.526px;
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
