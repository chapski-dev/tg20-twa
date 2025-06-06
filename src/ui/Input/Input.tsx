import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useState,
} from 'react'
import { SvgTickCircle } from 'ui/icons'
import * as S from './style'

//TODO: props refactoring

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  wrapperClassName?: string
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
  sublabel?: string
  isSearchInput?: boolean
  isSuccess?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    wrapperClassName,
    className,
    disabled,
    onChange,
    sublabel,
    value,
    error,
    placeholder,
    name,
    max,
    min,
    isSuccess = true,
    isSearchInput = true,
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
        <S.Label error={error}>
          {label}
          {sublabel && <S.Sublabel error={error}>{sublabel}</S.Sublabel>}
        </S.Label>
      )}
      <S.InputContainer className={className} error={error} focused={isFocused}>
        {icon}
        <S.Input
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
          ref={ref}
        />
        {actionElement}
        {isSuccess && value && !error && isSearchInput && <SvgTickCircle />}
      </S.InputContainer>
      {error && <S.ErrorMessageBlock children={errorMessage} />}
    </S.InputWrapper>
  )
})
