import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useState,
} from 'react'
import * as S from './style'

//TODO: props refactoring

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  wrapperClassName?: string;
  className?: string
  disabled?: boolean
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void
  value?: string | number
  error?: boolean
  errorMessage?: string
  placeholder?: string
  name?: string
  type?: HTMLInputTypeAttribute
  max?: number
  min?: number
  actionElement?: ReactNode
  label?: string
  icon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    wrapperClassName,
    className,
    disabled,
    onChange,
    value,
    error,
    placeholder,
    name,
    max,
    min,
    type,
    actionElement,
    errorMessage,
    label,
    icon,
    ...otherInputProps
  } = props

  const [isFocused, setIsFocused] = useState<boolean>(false)

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      if (max && Number(evt.target.value) > max) {
        evt.target.value = max.toString()

        return
      }

      if (
        type === 'number' &&
        min &&
        isNaN(Number(evt.target.value)) &&
        evt.target.value !== ''
      ) {
        evt.target.value = min.toString()
      }

      if (isNaN(Number(evt.target.value))) {
        return
      }
    }

    onChange?.(evt)
  }

  const toggleFocusedMode = () => {
    setIsFocused((prev) => !prev)
  }

  return (
    <S.InputWrapper className={wrapperClassName}>
      {label && (
        <S.Label error={error} isFocused={isFocused}>
          {label}
        </S.Label>
      )}
      <S.InputContainer
        className={className}
        error={error}
        isFocused={isFocused}
      >
        {icon}
        <S.Input
          ref={ref}
          disabled={disabled}
          max={max}
          min={min}
          name={name}
          onBlur={toggleFocusedMode}
          onChange={handleChange}
          onFocus={toggleFocusedMode}
          placeholder={placeholder}
          value={value}
          {...otherInputProps}
        />
        {actionElement}
      </S.InputContainer>
      {error && <S.ErrorMessageBlock>{errorMessage}</S.ErrorMessageBlock>}
    </S.InputWrapper>
  )
})
