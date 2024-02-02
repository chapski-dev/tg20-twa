import { FormInput } from 'features/FormFields/FormInput/FormInput'
import * as S from './style'
import { ImageInput } from 'features/FormFields/ImageInput/ImageInput';

export const InscribeForm = () => {
  return (
    <S.Wrapper>
      <S.FieldsWrapper>
        <FormInput
          label="Tick "
          sublabel='(only 4 characters allowed)'
          name="tick"
          placeholder="Characters like “abcd”"
        />
        <FormInput
          label="Set Total Supply"
          name="amount"
          placeholder="210 000 000 000"
        />
        <FormInput label="Set Limit/Mint" name="limit" placeholder="0" />
        <ImageInput label='Upload token logo' name='file' />

      </S.FieldsWrapper>
    </S.Wrapper>
  )
}
