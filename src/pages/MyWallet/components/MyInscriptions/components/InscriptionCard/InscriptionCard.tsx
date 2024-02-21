import { FC, useMemo } from 'react'
import { fromNano } from '@ton/core'
import { generatePath, useNavigate } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgArrowLeftAssets, SvgGramIcon, SvgToncoinIcon } from 'ui/icons'
import * as S from './style'

type InscriptionCardProps = {
  tick: string
  balance: number
  floor_price?: number
}

export const InscriptionCard: FC<InscriptionCardProps> = (props) => {
  const { tick, balance, floor_price } = props

  const { tonPrice } = useTelegram()

  const navigate = useNavigate()

  const currentUsdPrice = useMemo(() => {
    if (!tonPrice) {
      return
    }

    switch (tick) {
      case 'ton':
        return tonPrice
      default:
        return Number(fromNano(floor_price || 0))
    }
  }, [tick, tonPrice, floor_price])

  const goToTokenTransferHistory = () => {
    if (tick === 'ton') {
      return
    }

    const path = generatePath(AppRoutes.TransferHistory, { tick })
    navigate(path)
  }

  return (
    <S.WrapperGaneral onClick={goToTokenTransferHistory}>
      <S.Wrapper>
        <S.TokenImageWrapper>
          {tick === 'ton' ? <SvgToncoinIcon /> : <SvgGramIcon />}
        </S.TokenImageWrapper>
        <S.ContentWrapper>
          <S.ContentInner>
            <S.InfoWrapper>
              <S.Title>{tick === 'ton' ? tick.toUpperCase() : tick}</S.Title>
              {(tick === 'ton' || Boolean(floor_price)) && (
                <S.Label children={`$${currentUsdPrice && currentUsdPrice}`} />
              )}
            </S.InfoWrapper>
            <S.InfoWrapper>
              <S.Title children={balance} />

              {(tick === 'ton' || Boolean(floor_price)) && (
                <S.Label
                  children={`$${
                    currentUsdPrice && (currentUsdPrice * balance).toFixed(2)
                  }`}
                />
              )}
            </S.InfoWrapper>
          </S.ContentInner>
          {tick !== 'ton' && <SvgArrowLeftAssets />}
        </S.ContentWrapper>
      </S.Wrapper>
      <S.Line />
    </S.WrapperGaneral>
  )
}
