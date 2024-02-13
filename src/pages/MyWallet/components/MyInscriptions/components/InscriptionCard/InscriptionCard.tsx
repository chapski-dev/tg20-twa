import { FC, useMemo } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgArrowLeftAssets, SvgGramIcon, SvgToncoinIcon } from 'ui/icons'
import * as S from './style'

type InscriptionCardProps = {
  tick: string
  balance: number
}

export const InscriptionCard: FC<InscriptionCardProps> = (props) => {
  const { tick, balance } = props

  const { tonPrice } = useTelegram()

  const navigate = useNavigate()

  const currentUsdPrice = useMemo(() => {
    if (!tonPrice) {
      return
    }

    switch (tick) {
      case 'ton':
        return tonPrice
      case 'gram':
        return 0.000004
    }
  }, [tick, tonPrice])

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
              {(tick === 'gram' || tick === 'ton') && (
                <S.Label>${currentUsdPrice && currentUsdPrice}</S.Label>
              )}
            </S.InfoWrapper>
            <S.InfoWrapper>
              <S.Title>{balance}</S.Title>

              {(tick === 'gram' || tick === 'ton') && (
                <S.Label>
                  ${currentUsdPrice && (currentUsdPrice * balance).toFixed(2)}
                </S.Label>
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
