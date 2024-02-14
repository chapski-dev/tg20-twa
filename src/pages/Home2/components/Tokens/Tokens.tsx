import { FC } from 'react'
import { TopToken } from 'api/types'
import { Token } from './components'
import * as S from './style'

type TokensProps = {
  tokens: TopToken[]
}

export const Tokens: FC<TokensProps> = (props) => {
  const { tokens } = props

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle align="left">Token ({tokens.length})</S.HeaderTitle>
        <S.HeaderTitle align="right">24h Volume</S.HeaderTitle>
        {/* <S.HeaderTitle align="right">Last Price</S.HeaderTitle> */}
      </S.Header>
      <S.Tokens>
        {tokens.map((token) => (
          <Token key={token.tick} token={token} />
        ))}
      </S.Tokens>
    </S.Container>
  )
}
