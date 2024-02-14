import { generatePath, useNavigate } from 'react-router-dom'
import { TopToken } from 'api/types'
import { AppRoutes } from 'constants/app'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgGramIcon, SvgVerify } from 'ui/icons'
import * as S from './style'

type TokenProps = {
  token: TopToken
}

export const Token = ({ token }: TokenProps) => {
  const { tonPrice } = useTelegram()

  const navigate = useNavigate()

  const goToToken = (id: string) => {
    const path = generatePath(AppRoutes.Token, { id })
    navigate(path)
  }

  return (
    <S.Box onClick={() => goToToken(token.tick)}>
      <S.Logo>
        <SvgGramIcon style={{ width: '30px', height: '30px' }} />
        <S.Wrapper>
          <S.TokenTitleWrapper>
            <S.TokenTitle>{token.tick.toUpperCase()}</S.TokenTitle>
            {token.verified && <SvgVerify />}
          </S.TokenTitleWrapper>
          <S.TokenDescription>
            {token.tick[0].toUpperCase() + token.tick.slice(1)} Token
          </S.TokenDescription>
        </S.Wrapper>
      </S.Logo>
      <S.Volume>
        ${tonPrice && (token.volume_24h * tonPrice).toFixed(0)}
      </S.Volume>

      {/* <S.Wrapper2>
        <S.Volume>${token.lastPrice}</S.Volume>
        <Chart position={token.chartPosition} text={token.chartText} />
      </S.Wrapper2> */}
    </S.Box>
  )
}
