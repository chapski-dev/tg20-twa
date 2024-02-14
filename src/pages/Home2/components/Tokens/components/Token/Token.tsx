import { TopToken } from 'api/types'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgVerify } from 'ui/icons'
import * as S from './style'
import Pepe from '../../assets/pepe.png'

type TokenProps = {
  token: TopToken
}

export const Token = ({ token }: TokenProps) => {
  const { tonPrice } = useTelegram()

  return (
    <S.Box>
      <S.Logo>
        <S.Img alt={token.tick} src={Pepe} />
        <S.Wrapper>
          <S.TokenTitleWrapper>
            <S.TokenTitle>{token.tick}</S.TokenTitle>
            {token.verified && <SvgVerify />}
          </S.TokenTitleWrapper>
          {/* <S.TokenDescription>{token.}</S.TokenDescription> */}
        </S.Wrapper>
      </S.Logo>
      <S.Volume>${tonPrice && token.volume_24h * tonPrice}</S.Volume>

      {/* <S.Wrapper2>
        <S.Volume>${token.lastPrice}</S.Volume>
        <Chart position={token.chartPosition} text={token.chartText} />
      </S.Wrapper2> */}
    </S.Box>
  )
}
