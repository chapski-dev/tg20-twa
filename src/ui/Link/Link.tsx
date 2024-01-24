import { FCWithChildren } from 'types/app'
import * as S from './style'

type LinkProps = {
  href: string
}

export const Link: FCWithChildren<LinkProps> = (props) => {
  const { children } = props

  return <S.Wrapper>{children}</S.Wrapper>
}
