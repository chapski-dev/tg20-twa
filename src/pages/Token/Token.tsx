import { FC, useCallback, useState } from 'react'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { getTokenInfo } from 'api'
import { AppRoutes } from 'constants/app'
import { BackButton } from 'features/BackButton'
import { MainButton } from 'features/MainButton'
import { Button } from 'ui/Button/Button'
import { Container } from 'ui/Container/Container'
import { SvgVerified } from 'ui/icons'
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators'
import { HoldersTable, ProgressLine, TransferPopup } from './components'

import * as S from './style'

const ROYALTY_ADDRESS = 'EQBAeW5Kypzgt4WcgJZV8JLIhGUFYmHJfoKrJlBKHde74ps4'

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
        <BackButton/>
        <Container>
          <S.TokenCardWrapper>
            <S.TokenCardHeader>
              <S.TokenCardHeaderLeftSideWrapper>
                {/* {tokenData.tick === 'gram' ? (
                  <S.TokenIcon />
                ) : (
                  <S.DynamicTickLogo tick={tokenData.tick} />
                )} */}

                <S.TokenIcon />

                <S.TitleWrapper>
                  <S.Title>{tokenData.tick}</S.Title>
                  {(tokenData.tick === 'gram' || tokenData.verified) && (
                    <SvgVerified />
                  )}
                </S.TitleWrapper>
              </S.TokenCardHeaderLeftSideWrapper>
              {/* <S.SupplyLabel>
                {formatNumberWithSeparators(tokenData.supply)}{' '}
                <S.SupplyLabel $type="value">
                  / {formatNumberWithSeparators(tokenData.total_supply)}
                </S.SupplyLabel>
              </S.SupplyLabel> */}
              {tokenData.mintable && (
                <Button
                  onClick={() =>
                    navigate({
                      pathname: AppRoutes.Inscribe,
                      search: createSearchParams({
                        type: 'mint',
                        tick: tokenData.tick,
                        from: 'token',
                      }).toString(),
                    })
                  }
                >
                  Mint
                </Button>
              )}
            </S.TokenCardHeader>

            <ProgressLine mintedSupplyPercent={mintedSupplyPercent} />

            {/* <S.Line /> */}

            <S.InfoBlockWrapper>
              <S.FieldWrapper>
                <S.Label $isBold>Minted Supply </S.Label>
                <S.Label>
                  {formatNumberWithSeparators(tokenData.supply)} (
                  {mintedSupplyPercent.toFixed(2)}%)
                </S.Label>
              </S.FieldWrapper>

              <S.FieldWrapper>
                <S.Label $isBold>Total Supply</S.Label>
                <S.Label>
                  {formatNumberWithSeparators(tokenData.total_supply)}
                </S.Label>
              </S.FieldWrapper>

              <S.FieldWrapper>
                <S.Label $isBold>Limit per Mint</S.Label>
                <S.Label>{tokenData.mint_limit}</S.Label>
              </S.FieldWrapper>

              <S.FieldWrapper>
                <S.Label $isBold>Decimal</S.Label>
                <S.Label>{9}</S.Label>
              </S.FieldWrapper>

              <S.FieldWrapper>
                <S.Label $isBold>Hodlers</S.Label>
                <S.Label>
                  {formatNumberWithSeparators(tokenData.holders)}
                </S.Label>
              </S.FieldWrapper>

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
                <S.Label $isBold>Royalty Address</S.Label>
                <S.LinkFieldWrapper
                  href={`https://tonviewer.com/${tokenData.royalty_address}`}
                  target="_blank"
                >
                  <S.Label>{tokenData.royalty_address}</S.Label>
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
            </S.InfoBlockWrapper>
          </S.TokenCardWrapper>
          <HoldersTable
            supplied={tokenData.supply}
            totalSupply={tokenData.total_supply}
          />
        </Container>
        {isTradePopupOpened && (
          <TransferPopup onClose={toggleTradePopup} tick={tokenData.tick} />
        )}
        {isTokenDataLoaded && !tokenData.mintable && !isTradePopupOpened && (
          <MainButton onClick={toggleTradePopup} text={'Trade'} />
        )}
      </S.Wrapper>
    )
  }

  return null
}
