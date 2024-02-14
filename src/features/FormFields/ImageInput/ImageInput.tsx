import { ChangeEvent, FC, useRef, useState } from 'react'
import { useField } from 'formik'
import { SvgExit, SvgPlus } from 'ui/icons'
import * as S from './style'

type FormInputProps = {
  name: string
  label?: string
  disabled?: boolean;
}

export const ImageInput: FC<FormInputProps> = (props) => {
  const { name, label, disabled } = props
  const [field, meta, helpers] = useField(name)
  const [fileUrl, setFileUrl] = useState('')
  const inputRef = useRef<any>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }
    if (!e.target.files?.[0]) return
    const file = e.target.files[0];
    const fileToUrl = URL.createObjectURL(file);
    setFileUrl(fileToUrl);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => helpers.setValue(reader.result);
  }

  const onClear = () => {
    helpers.setValue('');
    setFileUrl('');
    inputRef.current.value = "";
  }

  return (
    <S.Container >
      <S.Label
        children={label}
        error={meta.touched && meta.error !== undefined}
      />
      <S.Wrapper disabled={disabled}>
        <S.Input
          {...field}
          ref={inputRef}
          name="file"
          onChange={handleChange}
          type="file"
        />
        {fileUrl && (
          <>
            <S.Image alt="image" src={fileUrl} />
            <SvgExit id='exit' onClick={onClear} />
          </>
        )}
        {!fileUrl && (
          <S.Flex>
            <SvgPlus />
            <S.Title children="Upload" />
          </S.Flex>
        )}
      </S.Wrapper>
      <S.ErrorMessage children={meta.touched && meta.error} />
    </S.Container>
  )
};
