import styled from 'styled-components'
import { SvgArrowLeft } from 'ui/icons'

export const Title = styled.div`
  font-size: 16px;
  font-style: normal;
  color: ${({ theme }) => theme.color.text};
  font-weight: 600;
  line-height: 16px;
  text-align: left;
`

export const Icon = styled(SvgArrowLeft)<{ isOpen: boolean }>`
  width: 24px;
  fill: ${({ theme }) => theme.color.text};
  rotate: ${({ isOpen }) => isOpen && '90deg'};
  height: 24px;
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  path {
    fill: ${({ theme }) => theme.color.text};
  }
`

export const Container = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  gap: 10px;
  font-weight: 500;
  font-size: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
`

export const Wrapper = styled.div<{ isOpen: boolean }>`
  overflow: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
`
export const Content = styled.div<{ isOpen: boolean; myHeight: string }>`
  padding: ${({ isOpen }) => (isOpen ? '10px 0 0 0' : '0')};
  transition: all 0.3s ease-in-out;
  height: ${({ isOpen, myHeight }) => (isOpen ? myHeight : '0px')};
`
