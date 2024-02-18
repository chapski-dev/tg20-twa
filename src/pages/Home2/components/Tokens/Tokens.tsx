import { FC } from 'react'
import { TopToken } from 'api/types'
import { Token, SkeletonToken } from './components'
import * as S from './style'

type TokensProps = {
  tokens: TopToken[]
  loading: boolean
}

export const Tokens: FC<TokensProps> = (props) => {
  const { tokens, loading } = props

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle children={`Token (${tokens.length})`} align="left" />
        <S.HeaderTitle children="24h Volume" align="right" />
      </S.Header>
      <S.Tokens>
        {loading
          ? [1, 2, 3].map(() => <SkeletonToken />)
          : tokens.map((token) => <Token key={token.tick} token={token} />)}
      </S.Tokens>
    </S.Container>
  )
}
