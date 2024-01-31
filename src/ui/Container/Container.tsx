import { FC, ReactNode } from 'react'
import * as S from './style'

type ContainerProps = {
  className?: string;
  children?: ReactNode | undefined;
}
export const Container: FC<ContainerProps> = (props) => {
  const { children, className } = props

  return <S.Wrapper
    children={children}
    className={className}
  />
}
