import { FC } from 'react'
import { useField } from 'formik'
import { InputProps } from 'ui/Input/Input'
import * as S from './style'

type FormInputProps = {
  name: string
  className?: string
  error?: boolean
  placeholder?: string
  editorProps?: Omit<InputProps, 'name' | 'onChange' | 'value' | 'placeholder'>
  label?: string
  sublabel?: string
}

export const FormInput: FC<FormInputProps> = (props) => {
  const { name, className, editorProps, error, placeholder, label, sublabel } = props

  const [field, meta] = useField(name)

  return (
    <S.Wrapper>
      <S.Input
        className={className}
        label={label}
        sublabel={sublabel}
        {...field}
        {...editorProps}
        error={error || meta.error !== undefined}
        placeholder={placeholder}
      />
      <S.ErrorMessage>{meta.error}</S.ErrorMessage>
    </S.Wrapper>
  )
}
