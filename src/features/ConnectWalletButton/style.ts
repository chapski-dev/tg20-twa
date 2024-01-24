import { styled } from 'styled-components'
import {
  SvgArrow,
  SvgGramIcon,
  SvgTonConnectIcon,
  SvgToncoinIcon,
  SvgWallet,
} from 'ui/icons'

export const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  outline: none;
  border-radius: 12px;
  width: max-content;
  height: 32px;
  padding: 10px 22px;
  color: ${({ theme }) => theme.color.btnText};
  background-color: ${({ theme }) => theme.color.btn};
  cursor: pointer;
  transition: opacity 0.3s;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;

  &:hover {
    opacity: 0.8;
  }
`

export const AddressContainer = styled.div`
  width: max-content;
  height: 38px;
  position: relative;
`

export const AddressBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 38px;
  padding: 8px 12px;
  border-radius: 12px;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.bgSecondary};
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
`

export const ArrowIcon = styled(SvgArrow)<{ isActive: boolean | null }>`
  min-width: 12px;
  min-height: 12px;
  width: 12px;
  height: 12px;

  transform: ${({ isActive }) => isActive && 'rotate(180deg)'};

  path {
    fill: ${({ theme }) => theme.color.text};
  }
`

export const DropdownButtons = styled.div<{ $isDisplayed: boolean | null }>`
  display: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  opacity: ${({ $isDisplayed }) => ($isDisplayed ? 1 : 0)};
  transform: translateY(
    ${({ $isDisplayed }) => ($isDisplayed ? '0' : '-10px')}
  );
  transition: opacity 0.15s ease, transform 0.15s ease;
  z-index: ${({ $isDisplayed }) => ($isDisplayed ? '1' : '-1')};
`

export const DropdownButton = styled.button<{ $isDisplayed?: boolean | null }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 16px 16px;
  width: 100%;
  max-height: 44px;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.bgSecondary};
  cursor: pointer;
  transition: opacity 0.3s;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  pointer-events: ${({ $isDisplayed }) => ($isDisplayed ? 'auto' : 'none')};

  &:hover {
    opacity: 0.5;
  }
`

export const ToncoinIcon = styled(SvgTonConnectIcon)`
  path {
    fill: ${({ theme }) => theme.color.btnText};
  }
`

//

export const WalletBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  width: 100%;
`

export const MyWalletButton = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.14px;
  color: ${({ theme }) => theme.color.btn};
  cursor: pointer;
`

export const WalletIcon = styled(SvgWallet)`
  path {
    fill: ${({ theme }) => theme.color.btn};
  }
`

export const BalancesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const BalanceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

export const BalanceLabel = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.14px;
  color: ${({ theme }) => theme.color.text};
`

export const GramIcon = styled(SvgGramIcon)`
  width: 20px;
  height: 20px;
`

export const TonIcon = styled(SvgToncoinIcon)`
  width: 20px;
  height: 20px;
`

export const DisconnectButton = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.14px;
  color: ${({ theme }) => theme.color.redAlert};
  cursor: pointer;

  svg {
    path {
      stroke: ${({ theme }) => theme.color.redAlert};
    }
  }
`
