import { FC } from 'react'
import * as S from './style'

type LoaderProps = {
  className?: string
}

export const Loader: FC<LoaderProps> = (props) => {
  const { className } = props

  return (
    <S.Wrapper className={className}>
      <S.Spinner />
    </S.Wrapper>
  )
}
