import { SvgTransactionCanceled, SvgTransactionSuccess } from 'ui/icons'
import { Modal } from 'ui/Modal/Modal'
import * as S from './style'

export type TransactionStatusModalProps = {
  onClose: () => void
  success: boolean
}

export const TransactionStatusModal: React.FC<TransactionStatusModalProps> = ({
  onClose,
  success,
}) => {
  return (
    <Modal onClose={onClose} title={''}>
      <S.Wrapper>
        {success ? <SvgTransactionSuccess /> : <SvgTransactionCanceled />}
        <S.StatusText>
          {success ? 'Transaction sent' : 'Transaction canceled'}
        </S.StatusText>
        <S.StatusDescription>
          {success
            ? 'Your transaction will be processed in a few seconds.'
            : 'There will be no changes to your account.'}
        </S.StatusDescription>
      </S.Wrapper>
    </Modal>
  )
}
