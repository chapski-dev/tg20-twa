import { FC, useMemo } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import { convertNumberToShortFormat } from 'utils/convertNumberToShortFormat'
import * as S from './style'

type TokenCardProps = {
  tick: string
  holders: number
  mintable: boolean
  supply: number
  total_supply: number
  verified: boolean
}

export const TokenCard: FC<TokenCardProps> = (props) => {
  const { tick, supply, total_supply, verified } = props

  const navigate = useNavigate()

  const mintedPercent = useMemo(() => {
    return Math.floor((supply / total_supply) * 100)
  }, [supply, total_supply])

  const goToToken = (id: string ) => {
    const path = generatePath(AppRoutes.Token, { id });
    navigate(path);
  };

  return (
    <S.Wrapper onClick={() => goToToken(tick)}>
      <S.ContentWrapper>
        <S.InfoWrapper>
          <S.Header>
            <S.TokenImage />
            <S.TitleWrapper>
              <S.Title>{tick}</S.Title>
              {(tick === 'gram' || verified) && <S.Verified />}
            </S.TitleWrapper>
          </S.Header>
          <div style={{ display: 'flex' }}>
            <S.InfoLabelsWrapper>
              <S.Label children="Total supply:" />
              <S.InfoValue children={convertNumberToShortFormat(total_supply)} />
            </S.InfoLabelsWrapper>
            <S.InfoValuesWrapper>
              <S.Label children="Minted:" />
              <S.InfoValue children={`${convertNumberToShortFormat(supply)} (${mintedPercent}%)`} />
            </S.InfoValuesWrapper>
          </div>
        </S.InfoWrapper>
      </S.ContentWrapper>
    </S.Wrapper>
  )
}
