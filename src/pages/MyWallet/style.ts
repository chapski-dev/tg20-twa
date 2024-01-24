import styled from 'styled-components'
import { SvgCopy } from 'ui/icons'
import { Tabs as UITabs } from 'ui/Tabs/Tabs'

export const Wrapper = styled.div`
  display: flex;
  min-width: 100%;
  gap: 24px;
  flex-direction: column;
  align-self: center;
  padding: 24px 0;
`

export const Tabs = styled(UITabs)`
  min-width: 100%;
`

export const WalletAddressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  margin: 0 auto;
`

export const CopyIcon = styled(SvgCopy)`
  width: 16px;
  height: 16px;

  path {
    fill: ${({ theme }) => theme.color.link};
  }
`

export const WalletLabel = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  color: ${({ theme }) => theme.color.link};
  text-align: center;
  max-width: 238px;
  word-break: break-all;
`

export const BlockWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`
