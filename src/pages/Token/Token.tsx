import { FC, useCallback, useState } from 'react'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { getTokenInfo } from 'api'
import { AppRoutes } from 'constants/app'
import { BackButton } from 'features/BackButton'
import { PromoSlider } from 'features/PromoSlider/PromoSlider'
import { promoSlides } from 'mocks/promosMock'
import { Accordion } from 'ui'
import { Button } from 'ui/Button/Button'
import { SvgVerified } from 'ui/icons'
import { Promo } from 'ui/Promo'
import { convertNumberToShortFormat } from 'utils/convertNumberToShortFormat'
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators'
import { HoldersTable, TransferPopup } from './components'
import * as S from './style'

export const Token: FC = () => {
  const { id: tick } = useParams()

  const [isTradePopupOpened, setIsTradePopupOpened] = useState<boolean>(false)

  const navigate = useNavigate()

  const {
    data: tokenData,
    isLoading: isTokenDataLoading,
    isSuccess: isTokenDataLoaded,
  } = useQuery(['tokenData'], () => getTokenInfo(tick as string), {
    enabled: !!tick,
  })

  const toggleTradePopup = useCallback(() => {
    setIsTradePopupOpened((prev) => !prev)
  }, [])

  if (isTokenDataLoading) {
    return <S.Loader />
  }

  if (isTokenDataLoaded) {
    const mintedSupplyPercent =
      (tokenData.supply / tokenData.total_supply) * 100

    if (!tokenData.address) {
      return (
        <S.NotFoundBlock>
          <S.NotFountInfoBlockWrapper>
            <S.NotFountLabel>Oops! Token not found</S.NotFountLabel>
            <Button onClick={() => navigate(AppRoutes.Home)}>Go home</Button>
          </S.NotFountInfoBlockWrapper>
        </S.NotFoundBlock>
      )
    }

    return (
      <S.Wrapper>
        <BackButton onClick={() => navigate(AppRoutes.Inscriptions)} />

        <S.TokenCardHeader>
          <S.TokenCardHeaderLeftSideWrapper>
            <S.TokenIconWrapper>
              <S.TokenIcon />
            </S.TokenIconWrapper>

            <S.TitleWrapper>
              <S.Title>{tokenData.tick}</S.Title>
              {(tokenData.tick === 'gram' || tokenData.verified) && (
                <SvgVerified />
              )}
              {tokenData.mintable && <S.Mintable>Minting Fast 🔥</S.Mintable>}
              {!tokenData.mintable && <S.NotMintable>Trading ✅</S.NotMintable>}
            </S.TitleWrapper>
          </S.TokenCardHeaderLeftSideWrapper>
        </S.TokenCardHeader>
        <S.TokenCardHeaderList>
          <S.TokenCardHeaderListItem align="flex-start">
            <S.TokenCardHeaderListItemTitle>
              Total Supply
            </S.TokenCardHeaderListItemTitle>
            <S.TokenCardHeaderListItemText>
              {convertNumberToShortFormat(tokenData.total_supply)}
            </S.TokenCardHeaderListItemText>
          </S.TokenCardHeaderListItem>
          <S.TokenCardHeaderListItem align="flex-start">
            <S.TokenCardHeaderListItemTitle>
              Minted Supply
            </S.TokenCardHeaderListItemTitle>
            <S.TokenCardHeaderListItemText>
              {convertNumberToShortFormat(tokenData.supply)}
            </S.TokenCardHeaderListItemText>
          </S.TokenCardHeaderListItem>
          <S.TokenCardHeaderListItem align="flex-end">
            <S.TokenCardHeaderListItemTitle>
              Minted %
            </S.TokenCardHeaderListItemTitle>
            <S.TokenCardHeaderListItemText>
              {mintedSupplyPercent.toFixed(2)}%
            </S.TokenCardHeaderListItemText>
          </S.TokenCardHeaderListItem>
        </S.TokenCardHeaderList>
        <S.Container>
          <Accordion
            className="accordion"
            height="240px"
            title="Inscription Details"
          >
            <S.Field>
              <S.FieldWrapper>
                <S.Label $isBold>Inscription Address</S.Label>
                <S.LinkFieldWrapper
                  href={`https://tonviewer.com/${tokenData.address}`}
                  target="_blank"
                >
                  <S.Label>{tokenData.address}</S.Label>
                  <S.LinkIcon />
                </S.LinkFieldWrapper>
              </S.FieldWrapper>
              <S.FieldWrapper>
                <S.Label $isBold>Deployed by</S.Label>
                <S.LinkFieldWrapper
                  href={`https://tonviewer.com/${tokenData.owner}`}
                  target="_blank"
                >
                  <S.Label>{tokenData.owner}</S.Label>
                  <S.LinkIcon />
                </S.LinkFieldWrapper>
              </S.FieldWrapper>
              <S.FieldWrapper>
                <S.Label $isBold>Deploy time</S.Label>
                <S.Label>
                  {dayjs(tokenData.deploy_time * 1000).format(
                    'YYYY/MM/DD HH:mm:ss'
                  )}
                </S.Label>
              </S.FieldWrapper>
              <S.FieldFlex>
                <S.FieldFlexItem>
                  <S.FieldFlexItemLabel $isBold>
                    Limit/Mint
                  </S.FieldFlexItemLabel>
                  <S.FieldFlexItemLabel>
                    {tokenData.mint_limit}
                  </S.FieldFlexItemLabel>
                </S.FieldFlexItem>
                <S.FieldFlexItem>
                  <S.FieldFlexItemLabel $isBold>Decimal</S.FieldFlexItemLabel>
                  <S.FieldFlexItemLabel>9</S.FieldFlexItemLabel>
                </S.FieldFlexItem>
                <S.FieldFlexItem>
                  <S.FieldFlexItemLabel $isBold>Holders</S.FieldFlexItemLabel>
                  <S.FieldFlexItemLabel>
                    {formatNumberWithSeparators(tokenData.holders)}
                  </S.FieldFlexItemLabel>
                </S.FieldFlexItem>
              </S.FieldFlex>
            </S.Field>
          </Accordion>
          {tokenData.mintable && (
            <Button
              className="btn"
              onClick={() =>
                navigate({
                  pathname: AppRoutes.Mint,
                  search: createSearchParams({
                    type: 'mint',
                    tick: tokenData.tick,
                    from: 'token',
                  }).toString(),
                })
              }
            >
              Mint Now
            </Button>
          )}
          {!tokenData.mintable && (
            <Button
              className="btn"
              onClick={() =>
                navigate({
                  pathname: AppRoutes.Marketplace,
                  search: createSearchParams({
                    from: 'token',
                  }).toString(),
                })
              }
            >
              Buy / Sell {tokenData.tick.toUpperCase()}
            </Button>
          )}
        </S.Container>
        <S.PromoSliderWrap>
          <PromoSlider slides={promoSlides} />
        </S.PromoSliderWrap>
        <S.TableWrapper>
          <S.TableTitle>Holdings</S.TableTitle>
        </S.TableWrapper>
        <HoldersTable
          supplied={tokenData.supply}
          totalSupply={tokenData.total_supply}
        />
        {isTradePopupOpened && (
          <TransferPopup onClose={toggleTradePopup} tick={tokenData.tick} />
        )}
      </S.Wrapper>
    )
  }

  return null
}
