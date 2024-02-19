import { FC } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { QRCodeSVG } from 'qrcode.react'
import { theme } from 'assets/style/theme'
import { useClipboard } from 'hooks/useClipboard/useClipboard'
import { Modal } from 'ui'
import * as S from './style'

type ReceivePopupProps = {
  onClose: () => void
}

export const ReceivePopup: FC<ReceivePopupProps> = ({ onClose }) => {
  const userWalletAddress = useTonAddress()

  const clipboard = useClipboard()

  const copyWalletAddress = async () => {
    clipboard(userWalletAddress, () => {
      alert('Address copied!')
    })
  }

  return (
    <Modal onClose={onClose} title={'Receive'}>
      <S.WrapperModal>
        <S.QrCodeWrapper>
          <QRCodeSVG
            bgColor={theme.color.bg}
            fgColor={theme.color.bgSecondary}
            size={220}
            value={userWalletAddress}
          />
          <S.Label>{userWalletAddress}</S.Label>
        </S.QrCodeWrapper>
        <S.CopyButton children="Copy" onClick={copyWalletAddress} />
      </S.WrapperModal>
    </Modal>
  )
}
