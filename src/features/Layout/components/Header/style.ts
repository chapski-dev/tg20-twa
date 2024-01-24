import styled from 'styled-components'
import { ConnectWalletButton } from 'features/ConnectWalletButton'
import { Button as UIButton } from 'ui/Button/Button'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 6px;
  padding-top: 15px;
`

export const Button = styled(UIButton)`
  width: 49%;
  height: 38px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
`

export const ConnectButton = styled(ConnectWalletButton)`
  width: 100%;
  height: 40px;
`
