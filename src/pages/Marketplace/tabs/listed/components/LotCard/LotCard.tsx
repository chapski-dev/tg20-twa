import React, { useMemo } from 'react'
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
}

export const LotCard: React.FC<LotCardProps> = (props) => {
  const { amount, onBuyClick, lotPrice, lotTotal, lotId } = props
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
    <>
      <S.Wrapper>
        <S.ContentWrapper>
          <S.LotInfoWrapper>
            <S.LotPriceWrapper>
              <S.AmountText>
                <SvgToncoinIcon height={20} width={20} />
                {formatNumberWithSeparators(amount)} GRAM
              </S.AmountText>
              <S.NumberApplication>#{lotId}</S.NumberApplication>
            </S.LotPriceWrapper>
          </S.LotInfoWrapper>
          <S.TotalTextWrapper>
            <S.TotalText>
              <S.TotalTextTitle>Total Price</S.TotalTextTitle>
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
              <S.Price>
                <span>{prices.priceInTON} TON</span>
                <br /> <span>~{prices.priceInUSD.toFixed(10)} USD</span>
              </S.Price>
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
    </>
  )
}
