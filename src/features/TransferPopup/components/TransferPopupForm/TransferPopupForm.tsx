import { FC } from 'react';
import { useField, useFormikContext } from 'formik';
import { MainButton } from 'features/MainButton';
import { Input } from 'ui/Input/Input';
import * as S from './style';

type TransferPopupFormProps = {
  isTransfering: boolean;
}

export const TransferPopupForm: FC<TransferPopupFormProps> = (props) => {
  const { isTransfering } = props;
  const { handleSubmit } = useFormikContext();
  const [amountField, amountMeta] = useField("amount");
  const [addressField, addressMeta] = useField("address");
  const [memoField, memoMeta] = useField("memo");

  return (
    <S.Wrapper>
      <Input
        label="Amount"
        placeholder="10.000"
        {...amountField}
        error={!!(amountMeta?.touched && amountMeta?.error)}
        errorMessage={amountMeta?.error}
        type="number"
      />
      <Input
        label="Receiver address"
        placeholder="Enter address"
        {...addressField}
        error={!!(addressMeta?.touched && addressMeta?.error)}
        errorMessage={addressMeta?.error}
      />
      <Input
        label="MEMO (Optional)"
        placeholder="Comment"
        {...memoField}
        error={!!(memoMeta?.touched && memoMeta?.error)}
        errorMessage={memoMeta?.error}
      />
      <MainButton
        onClick={handleSubmit}
        progress={isTransfering}
        text="Transfer"
      />
    </S.Wrapper>
  )
};
