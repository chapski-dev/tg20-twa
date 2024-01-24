import { FC } from 'react'
import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppRoutes } from 'constants/app'

import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgDisconnectIcon } from 'ui/icons'

import { convertNumberToShortFormat } from 'utils/convertNumberToShortFormat'
import * as S from './style'

type ConnectWalletButtonProps = {
  className?: string
}

export const ConnectWalletButton: FC<ConnectWalletButtonProps> = (props) => {
  const { className } = props

  const location = useLocation()

  const navigate = useNavigate()

  const { webApp, currentGramBalance, currentWalletBalance } = useTelegram()

  const [tonConnectUI] = useTonConnectUI()
  const address = useTonAddress()

  const handleConnectWalletClick = () => {
    if (!webApp) {
      return
    }

    webApp?.expand()

    webApp?.disableClosingConfirmation()

    tonConnectUI.openModal()
  }

  const handleMyWalletClick = () => {
    navigate(AppRoutes.MyWallet)
  }

  const handleDisconnectButtonClick = () => {
    tonConnectUI.disconnect()

    if (location.pathname === AppRoutes.MyWallet) {
      navigate(AppRoutes.Home)
    }
  }

  return !address ? (
    <S.Wrapper className={className} onClick={handleConnectWalletClick}>
      <S.ToncoinIcon />
      Connect Wallet
    </S.Wrapper>
  ) : (
    <S.WalletBlock>
      <S.MyWalletButton onClick={handleMyWalletClick}>
        <S.WalletIcon /> My Wallet
      </S.MyWalletButton>
      {location.pathname === AppRoutes.MyWallet ? (
        <S.DisconnectButton onClick={handleDisconnectButtonClick}>
          <SvgDisconnectIcon /> Disconnect
        </S.DisconnectButton>
      ) : (
        <S.BalancesWrapper>
          <S.BalanceWrapper>
            <S.TonIcon />
            <S.BalanceLabel>
              {typeof currentWalletBalance !== 'undefined'
                ? currentWalletBalance.toFixed(2)
                : '-.--'}
            </S.BalanceLabel>
          </S.BalanceWrapper>
          <S.BalanceWrapper>
            <S.GramIcon />
            <S.BalanceLabel>
              {typeof currentGramBalance !== 'undefined'
                ? convertNumberToShortFormat(currentGramBalance)
                : '-.--'}
            </S.BalanceLabel>
          </S.BalanceWrapper>
        </S.BalancesWrapper>
      )}
    </S.WalletBlock>
  )
}
