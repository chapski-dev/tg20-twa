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
    <Modal onClose={onClose}>
      <S.Wrapper>
        {success ? <SvgTransactionSuccess /> : <SvgTransactionCanceled />}
        <S.StatusText>
          {success ? 'Transaction Completed' : 'Transaction Failed'}
        </S.StatusText>
        <S.StatusDescription>
          {success
            ? 'Success! Your transaction is now complete. You can view the details of this transaction'
            : 'There was a problem processing your transaction. Please ensure your account has sufficient funds and try again'}
        </S.StatusDescription>
        <S.ActionLink children="View on explorer" />
      </S.Wrapper>
    </Modal>
  )
}
