import { FC, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import { DynamicTickLogo } from 'ui/DynamicTickLogo/DynamicTickLogo'
import { SvgVerified } from 'ui/icons'
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators'
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
  const { tick, mintable, supply, total_supply, verified } = props

  const navigate = useNavigate()

  const mintedPercent = useMemo(() => {
    return Math.floor((supply / total_supply) * 100)
  }, [supply, total_supply])

  return (
    <S.Wrapper onClick={() => navigate(`${AppRoutes.Token}/${tick}`)}>
      <S.ContentWrapper>
        {/* {tick === 'gram' ? <S.TokenImage /> : <DynamicTickLogo tick={tick} />} */}

        <S.TokenImage />

        <S.InfoWrapper>
          <S.FlexWrpaper>
            <S.TitleWrapper>
              <S.Title>{tick}</S.Title>
              {(tick === 'gram' || verified) && <SvgVerified />}
            </S.TitleWrapper>
            <S.TagsWrapper>{mintable && <S.Tag>Mintable</S.Tag>}</S.TagsWrapper>
          </S.FlexWrpaper>
          <S.FlexWrpaper>
            <S.InfoLabelsWrapper>
              <S.Label>Total supply:</S.Label>
              <S.Label>Minted:</S.Label>
            </S.InfoLabelsWrapper>
            <S.InfoValuesWrapper>
              <S.InfoValue>
                {formatNumberWithSeparators(total_supply)}
              </S.InfoValue>
              <S.InfoValue>
                {formatNumberWithSeparators(supply)} ({mintedPercent}%)
              </S.InfoValue>
            </S.InfoValuesWrapper>
          </S.FlexWrpaper>
        </S.InfoWrapper>
      </S.ContentWrapper>
      <S.MintButton>
        <S.ArrowIcon />
      </S.MintButton>
    </S.Wrapper>
  )
}
