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
            <S.NotFountLabel children="Oops! Token not found" />
            <Button
              children="Go home"
              onClick={() => navigate(AppRoutes.Home)}
            />
          </S.NotFountInfoBlockWrapper>
        </S.NotFoundBlock>
      )
    }

    return (
      <S.Wrapper>
        <BackButton />

        <S.TokenCardHeader>
          <S.TokenCardHeaderLeftSideWrapper>
            <S.TokenIconWrapper>
              {tokenData.image_url ? (
                <S.TokenImage src={tokenData.image_url} />
              ) : (
                <S.TokenIcon />
              )}
            </S.TokenIconWrapper>

            <S.TitleWrapper>
              <S.Title>{tokenData.tick}</S.Title>
              {(tokenData.tick === 'gram' || tokenData.verified) && (
                <SvgVerified color="red" />
              )}
              {tokenData.mintable && <S.Mintable children="Minting Fast 🔥" />}
              {!tokenData.mintable && <S.NotMintable children="Trading ✅" />}
            </S.TitleWrapper>
          </S.TokenCardHeaderLeftSideWrapper>
        </S.TokenCardHeader>
        <S.TokenCardHeaderList>
          <S.TokenCardHeaderListItem align="flex-start">
            <S.TokenCardHeaderListItemTitle children="Total Supply" />
            <S.TokenCardHeaderListItemText
              children={convertNumberToShortFormat(tokenData.total_supply)}
            />
          </S.TokenCardHeaderListItem>
          <S.TokenCardHeaderListItem align="flex-start">
            <S.TokenCardHeaderListItemTitle children="Minted Supply" />
            <S.TokenCardHeaderListItemText
              children={convertNumberToShortFormat(tokenData.supply)}
            />
          </S.TokenCardHeaderListItem>
          <S.TokenCardHeaderListItem align="flex-end">
            <S.TokenCardHeaderListItemTitle children="Minted %" />
            <S.TokenCardHeaderListItemText
              children={`${mintedSupplyPercent.toFixed(2)}%`}
            />
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
                <S.Label children="Inscription Address" $isBold />
                <S.LinkFieldWrapper
                  href={`https://tonviewer.com/${tokenData.address}`}
                  target="_blank"
                >
                  <S.Label>{tokenData.address}</S.Label>
                  <S.LinkIcon />
                </S.LinkFieldWrapper>
              </S.FieldWrapper>
              <S.FieldWrapper>
                <S.Label children="Deployed by" $isBold />
                <S.LinkFieldWrapper
                  href={`https://tonviewer.com/${tokenData.owner}`}
                  target="_blank"
                >
                  <S.Label>{tokenData.owner}</S.Label>
                  <S.LinkIcon />
                </S.LinkFieldWrapper>
              </S.FieldWrapper>
              <S.FieldWrapper>
                <S.Label children="Deploy time" $isBold />
                <S.Label>
                  {dayjs(tokenData.deploy_time * 1000).format(
                    'YYYY/MM/DD HH:mm:ss'
                  )}
                </S.Label>
              </S.FieldWrapper>
              <S.FieldFlex>
                <S.FieldFlexItem>
                  <S.FieldFlexItemLabel children="Limit/Mint" $isBold />
                  <S.FieldFlexItemLabel>
                    {tokenData.mint_limit}
                  </S.FieldFlexItemLabel>
                </S.FieldFlexItem>
                <S.FieldFlexItem>
                  <S.FieldFlexItemLabel children="Decimal" $isBold />
                  <S.FieldFlexItemLabel children="9" />
                </S.FieldFlexItem>
                <S.FieldFlexItem>
                  <S.FieldFlexItemLabel children="Holders" $isBold />
                  <S.FieldFlexItemLabel
                    children={formatNumberWithSeparators(tokenData.holders)}
                  />
                </S.FieldFlexItem>
              </S.FieldFlex>
            </S.Field>
          </Accordion>
          {tokenData.mintable && (
            <Button
              children="Mint Now"
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
            />
          )}
          {!tokenData.mintable && (
            <Button
              children={`Buy / Sell ${tokenData.tick.toUpperCase()}`}
              className="btn"
              onClick={() =>
                navigate({
                  pathname: AppRoutes.Marketplace,
                  search: createSearchParams({
                    from: 'token',
                  }).toString(),
                })
              }
            />
          )}
        </S.Container>
        <S.PromoSliderWrap>
          <PromoSlider slides={promoSlides} />
        </S.PromoSliderWrap>
        <S.TableWrapper>
          <S.TableTitle children="Holdings" />
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
