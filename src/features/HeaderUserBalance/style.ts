import styled from 'styled-components'
import { Text as UIText } from 'ui'
import { SvgWallet as UISvgWallet } from 'ui/icons'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 5px 8px;
  background-color: ${({ theme }) => theme.color.bg};
`

export const Text = styled(UIText)`
  color: ${({ theme }) => theme.color.hint};
`

export const SvgWallet = styled(UISvgWallet)`
  path {
    fill: ${({ theme }) => theme.color.hint};
  }
`

export const SumContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  svg {
    width: 16px;
    height: 16px;
  }
`
export const SvgWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`
