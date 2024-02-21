import { generatePath, useNavigate } from 'react-router-dom'
import { TopToken } from 'api/types'
import { AppRoutes } from 'constants/app'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgGramIcon, SvgVerify } from 'ui/icons'
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators'
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
        {token.image_url ? (
          <S.Img alt="token_logo" src={token.image_url} />
        ) : (
          <SvgGramIcon style={{ width: '30px', height: '30px' }} />
        )}
        <S.Wrapper>
          <S.TokenTitleWrapper>
            <S.TokenTitle children={token.tick.toUpperCase()} />
            {token.verified && <SvgVerify />}
          </S.TokenTitleWrapper>
          <S.TokenDescription
            children={`${
              token.tick[0].toUpperCase() + token.tick.slice(1)
            } Token`}
          />
        </S.Wrapper>
      </S.Logo>
      <S.Volume
        children={`$${formatNumberWithSeparators(
          token.volume_24h * (tonPrice || 0)
        )}`}
      />
    </S.Box>
  )
}
