import React, { useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'
import { theme } from 'assets/style/theme'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgToncoinIcon } from 'ui/icons'
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators'
import * as S from './style'

type PricesData = {
  price: number
  priceInUSD: number
  total: number
  totalInUSD: number
}

type LotCardProps = {
  amount: number
  onBuyClick: (pricesData: PricesData) => void
  lotPrice: number
  lotTotal: number
  lotId: number
  tick: string
}

export const LotCard: React.FC<LotCardProps> = (props) => {
  const { amount, onBuyClick, lotPrice, lotTotal, lotId, tick } = props

  const { tonPrice } = useTelegram()

  const prices = useMemo(() => {
    const priceInTON = lotPrice / Math.pow(10, 9)
    const totalInTON = lotTotal / Math.pow(10, 9)

    return {
      priceInTON,
      totalInTON,
      priceInUSD: priceInTON * (tonPrice || 0),
      totalInUSD: totalInTON * (tonPrice || 0),
    }
  }, [lotPrice, lotTotal, tonPrice])

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <S.LotInfoWrapper>
          <S.LotPriceWrapper>
            <S.AmountText>
              <SvgToncoinIcon height={20} width={20} />
              {formatNumberWithSeparators(amount)} {tick.toUpperCase()}
            </S.AmountText>
            <S.NumberApplication>#{lotId}</S.NumberApplication>
          </S.LotPriceWrapper>
        </S.LotInfoWrapper>
        <S.TotalTextWrapper>
          <S.TotalText>
            <S.TotalTextTitle children="Total Price" />
            <S.TotalInCurrencyTon>
              {prices.totalInTON.toFixed(3)} TON
              <SvgToncoinIcon height={15} width={15} />
            </S.TotalInCurrencyTon>
            <S.TotalInCurrencyDollar>
              ~ ${prices.totalInUSD.toFixed(3)}
            </S.TotalInCurrencyDollar>
          </S.TotalText>
          <S.PriceText>
            <S.TitlePriceText>SalePrice/Token</S.TitlePriceText>
            <S.PriceTextTon>{prices.priceInTON.toFixed(10)} TON</S.PriceTextTon>
            <S.PriceTextUsd>~{prices.priceInUSD.toFixed(10)}USD</S.PriceTextUsd>
          </S.PriceText>
          <S.BuyButton
            onClick={() =>
              onBuyClick({
                price: prices.priceInTON,
                priceInUSD: prices.priceInUSD,
                total: prices.totalInTON,
                totalInUSD: prices.totalInUSD,
              })
            }
          >
            Buy
          </S.BuyButton>
        </S.TotalTextWrapper>
      </S.ContentWrapper>
    </S.Wrapper>
  )
}

export const SkeletonLotCard = () => (
  <S.SkeletonLotCardWrapper>
    <div style={{ width: '100%' }}>
      <Skeleton baseColor={theme.color.bg} height={'106px'} />
    </div>
  </S.SkeletonLotCardWrapper>
)
