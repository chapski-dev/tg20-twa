import { FC } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { QRCodeSVG } from 'qrcode.react'
import { useClipboard } from 'hooks/useClipboard/useClipboard'
import { Button, Modal } from 'ui'
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
    <Modal onClose={onClose}>
      <S.WrapperModal>
        <S.TitleModal>Recieve</S.TitleModal>
        <S.QrCodeWrapper>
          <QRCodeSVG value={userWalletAddress} />
        </S.QrCodeWrapper>
        <S.CopyBtn>
          <Button children="Copy" onClick={copyWalletAddress} />
        </S.CopyBtn>
      </S.WrapperModal>
    </Modal>
  )
}
