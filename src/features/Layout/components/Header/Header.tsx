import { FC } from 'react'
import { Container } from 'ui/Container/Container'
import * as S from './style'

export const Header: FC = () => {
  return (
    <Container>
      <S.Wrapper>
        <S.ConnectButton />
      </S.Wrapper>
    </Container>
  )
}
