import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const HeroInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

export const Logo = styled(Skeleton)`
  width: 40px;
  height: 40px !important;
`

export const Title = styled(Skeleton)`
  color: ${({ theme }) => theme.color.text};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  width: 63px;
`

export const Description = styled(Skeleton)`
  color: ${({ theme }) => theme.color.hint};
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  width: 69px;
`

export const Volume = styled(Skeleton)`
  color: ${({ theme }) => theme.color.text};
  text-align: right;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  height: 16px !important;
  width: 63px;
`
