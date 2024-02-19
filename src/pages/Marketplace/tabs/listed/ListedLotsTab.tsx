import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery, useQuery } from 'react-query'
import { getPaginatedListedLots, getSearchedLot } from 'api'
import { LotSort, LotSortDirection, MarketplaceLot } from 'api/types'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { LotInfo } from 'pages/Marketplace/Marketplace'
import { LotCard } from './components'
import { SkeletonLotCard } from './components/LotCard/LotCard'
import * as S from './style'

type ListedLotsTabProps = {
  tick: string
  sort: LotSort
  direction: LotSortDirection
  userBalance?: number
  onBuyClick: (lotInfo: LotInfo) => void
  searchedId: string
}

const ITEMS_ON_PAGE = 50

export const ListedLotsTab: FC<ListedLotsTabProps> = (props) => {
  const { onBuyClick, tick, sort, direction, searchedId } = props

  const { tonPrice } = useTelegram()

  const [isWalletConnectionEstablished, setIsWalletConnectionEstablished] =
    useState(false)

  const address = useTonAddress()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsWalletConnectionEstablished(true)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [address])

  const getListedLots = useCallback(
    async ({ pageParam = 0 }) =>
      getPaginatedListedLots(tick, {
        count: ITEMS_ON_PAGE,
        direction: direction,
        offset: pageParam * ITEMS_ON_PAGE,
        sort: sort,
        id: searchedId,
      }),
    [direction, searchedId, sort, tick]
  )

  const {
    data: listedLotsData,
    fetchNextPage,
    hasNextPage,
    isLoading: isListedLotsDataLoading,
    isError: isListedLotsDataError,
    isSuccess: isListedLotsDataLoaded,
    isFetchingNextPage: isListedLotsDataNextPageFetching,
  } = useInfiniteQuery(
    ['listed-lots', tick, sort, direction, searchedId],
    getListedLots,
    {
      getNextPageParam: (lastPage, pages) => {
        const { total } = lastPage
        const currentTotalItems = pages.reduce(
          (acc, page) => acc + page.items.length,
          0
        )

        const isCurrentLessTotal = currentTotalItems < total

        return isCurrentLessTotal
          ? currentTotalItems / ITEMS_ON_PAGE
          : undefined
      },
    }
  )

  const {
    data: searchedLot,
    isLoading: isSearchedMarketplaceLotLoading,
    isSuccess: isSearchedMarketplaceLotLoaded,
  } = useQuery(
    ['searched-marketplace-lot', searchedId],
    () => getSearchedLot(searchedId),
    {
      enabled: !!searchedId,
    }
  )

  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isListedLotsDataNextPageFetching) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isListedLotsDataNextPageFetching])

  const listedLots = useMemo(() => {
    if (!listedLotsData) {
      return
    }

    return listedLotsData.pages.flatMap((page) => page.items)
  }, [listedLotsData])

  const isLoading = useMemo(
    () =>
      isListedLotsDataLoading ||
      !isWalletConnectionEstablished ||
      isSearchedMarketplaceLotLoading,
    [
      isListedLotsDataLoading,
      isSearchedMarketplaceLotLoading,
      isWalletConnectionEstablished,
    ]
  )

  if (isListedLotsDataError) {
    return (
      <S.Wrapper>
        <S.ErrorText>Error loading marketplace lots</S.ErrorText>
      </S.Wrapper>
    )
  }

  if (searchedId && !searchedLot?.id) {
    return (
      <S.Wrapper>
        <S.ErrorText>Lot with this id does not exist</S.ErrorText>
      </S.Wrapper>
    )
  }

  if (!tonPrice) {
    return <S.Loader />
  }

  return (
    <>
      <S.LotCardsWrapper>
        {isLoading && [1, 2, 3, 4].map(() => <SkeletonLotCard />)}

        {isListedLotsDataLoaded &&
          listedLots?.map((lot: MarketplaceLot, index) => (
            <>
              <LotCard
                key={index}
                amount={lot.amount}
                lotId={lot.id}
                lotPrice={lot.price}
                lotTotal={lot.total}
                onBuyClick={(pricesData) => {
                  onBuyClick({
                    address: lot.address,
                    amount: lot.amount,
                    buyer: lot.buyer,
                    closedAt: lot.closed_at,
                    createdAt: lot.created_at,
                    seller: lot.seller,
                    ...pricesData,
                  })
                }}
                tick={lot.tick}
              />
              <div ref={ref} />
            </>
          ))}
      </S.LotCardsWrapper>

      {isSearchedMarketplaceLotLoaded && searchedLot && searchedId && (
        <S.LotCardsWrapper>
          <LotCard
            amount={searchedLot.amount}
            lotId={searchedLot.id}
            lotPrice={searchedLot.price}
            lotTotal={searchedLot.total}
            onBuyClick={(pricesData) => {
              onBuyClick({
                address: searchedLot.address,
                amount: searchedLot.amount,
                buyer: searchedLot.buyer,
                closedAt: searchedLot.closed_at,
                createdAt: searchedLot.created_at,
                seller: searchedLot.seller,
                ...pricesData,
              })
            }}
            tick={searchedLot.tick}
          />
        </S.LotCardsWrapper>
      )}
    </>
  )
}
