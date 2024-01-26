import { FC, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import * as S from './style'

type TokenCardProps = {
  tick: string
  holders: number
  mintable: boolean
  supply: number
  total_supply: number
  verified: boolean
}

function convertToInternationalCurrencySystem(val: number) {
  const absValue = Math.abs(Number(val));

  if (absValue >= 1.0e+12) {
    return (absValue / 1.0e+12).toFixed(2).slice(0, -3) + "MM";
  } else if (absValue >= 1.0e+9) {
    return (absValue / 1.0e+9).toFixed(2).slice(0, -3) + "B";
  } else if (absValue >= 1.0e+6) {
    return (absValue / 1.0e+6).toFixed(2).slice(0, -3) + "M";
  } else if (absValue >= 1.0e+3) {
    return (absValue / 1.0e+3).toFixed(2).slice(0, -3) + "K";
  } else {
    return absValue.toString();
  }
}



export const TokenCard: FC<TokenCardProps> = (props) => {
  const { tick, supply, total_supply, verified } = props

  const navigate = useNavigate()

  const mintedPercent = useMemo(() => {
    return Math.floor((supply / total_supply) * 100)
  }, [supply, total_supply])

  return (
    <S.Wrapper onClick={() => navigate(`${AppRoutes.Token}/${tick}`)}>
      <S.ContentWrapper>
        <S.InfoWrapper>
          <div style={{ display: 'flex', alignItems: 'center', }}>
            <S.TokenImage />
            <S.TitleWrapper>
              <S.Title>{tick}</S.Title>
              {(tick === 'gram' || verified) && <S.Verified />}
            </S.TitleWrapper>
          </div>
          <div style={{ display: 'flex' }}>
            <S.InfoLabelsWrapper>
              <S.Label children="Total supply:" />
              <S.InfoValue children={convertToInternationalCurrencySystem(total_supply)} />
            </S.InfoLabelsWrapper>
            <S.InfoValuesWrapper>
              <S.Label children="Minted:" />
              <S.InfoValue children={`${convertToInternationalCurrencySystem(total_supply)} (${mintedPercent}%)`} />
            </S.InfoValuesWrapper>
          </div>
        </S.InfoWrapper>
      </S.ContentWrapper>
    </S.Wrapper>
  )
}
