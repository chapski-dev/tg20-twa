import { FCWithChildren } from 'types/app'
import { Spinner } from 'ui/Spinner/Spinner'
import * as S from './style'
import { ButtonVariant } from './types'

type ButtonProps = {
  className?: string
  onClick?: () => void
  isDisabled?: boolean
  isLoading?: boolean
  type?: 'submit' | 'button'
  form?: string
  variant?: ButtonVariant
}

export const Button: FCWithChildren<ButtonProps> = (props) => {
  const {
    className,
    onClick,
    isDisabled,
    isLoading,
    children,
    type = 'button',
    form,
    variant = 'default',
  } = props

  return (
    <S.Wrapper
      className={className}
      disabled={isDisabled || isLoading}
      form={form}
      onClick={onClick}
      type={type}
      variant={variant}
    >
      {isLoading ? <Spinner /> : children}
    </S.Wrapper>
  )
}
