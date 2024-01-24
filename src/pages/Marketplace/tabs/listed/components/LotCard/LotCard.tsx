import React, { useMemo } from 'react'
import { SvgDollarIcon, SvgToncoinIcon } from 'ui/icons'
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
  tonPrice: number
}

export const LotCard: React.FC<LotCardProps> = (props) => {
  const { amount, onBuyClick, lotPrice, lotTotal, tonPrice } = props

  const prices = useMemo(() => {
    const priceInTON = lotPrice / Math.pow(10, 9)
    const totalInTON = lotTotal / Math.pow(10, 9)

    return {
      priceInTON,
      totalInTON,
      priceInUSD: priceInTON * tonPrice,
      totalInUSD: totalInTON * tonPrice,
    }
  }, [lotPrice, lotTotal, tonPrice])

  return (
    <>
      <S.Wrapper>
        <S.ContentWrapper>
          <S.LotInfoWrapper>
            <S.LotPriceWrapper>
              <S.AmountText>{formatNumberWithSeparators(amount)}</S.AmountText>
              <S.PriceText>
                {prices.priceInTON} TON / {prices.priceInUSD.toFixed(10)} USD
              </S.PriceText>
            </S.LotPriceWrapper>
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
          </S.LotInfoWrapper>
          <S.TotalText>
            <S.TotalInCurrencyText>
              <SvgToncoinIcon height={20} width={20} />
              {prices.totalInTON.toFixed(3)}
            </S.TotalInCurrencyText>
            <S.TotalInCurrencyText>
              <SvgDollarIcon />
              {prices.totalInUSD.toFixed(3)}
            </S.TotalInCurrencyText>
          </S.TotalText>
        </S.ContentWrapper>
      </S.Wrapper>
    </>
  )
}
