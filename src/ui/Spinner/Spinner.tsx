import { FC } from 'react'
import * as S from './style'

type SpinnerProps = {
  className?: string
}

export const Spinner: FC<SpinnerProps> = (props) => {
  const { className } = props

  return (
    <S.Wrapper className={className} viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        fill="none"
        r="20"
        strokeWidth="6"
      />
    </S.Wrapper>
  )
}
