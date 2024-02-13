import { FC, useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { getPaginatedMyLots, getTonPrice } from 'api'
import { LotSort, LotSortDirection } from 'api/types'
import { LotInfo } from 'pages/Marketplace/Marketplace'
import { Pagination } from 'ui/Pagination/Pagination'
import * as S from './style'

type MyOrdersTabProps = {
  tick: string
  sort: LotSort
  direction: LotSortDirection
  address: string
  priceFilter: 'TON' | 'USD'
  onCancelClick: (lot: LotInfo) => void
}

const ITEMS_ON_PAGE = 10

export const MyOrdersTab: FC<MyOrdersTabProps> = (props) => {
  const { onCancelClick, tick, sort, direction, address, priceFilter } = props

  const { data: tonPrice } = useQuery(['currentTonPrice'], () => getTonPrice())

  const [currentPage, setCurrentPage] = useState<number>(1)

  const handleChangePage = useCallback((page: number) => {
    setCurrentPage(page + 1)
  }, [])

  const {
    data: lotsList,
    isLoading,
    isSuccess,
    isError,
  } = useQuery(
    ['my-lots', currentPage, tick, sort, direction],
    () =>
      getPaginatedMyLots(tick, {
        count: ITEMS_ON_PAGE,
        offset: (currentPage - 1) * ITEMS_ON_PAGE,
        sort: sort,
        direction: direction,
        seller: address,
      }),
    {
      enabled: !!tick,
    }
  )

  if (isLoading) return <S.EndLoader />

  if (
    isError ||
    !isSuccess ||
    !lotsList ||
    !lotsList.items ||
    lotsList.items.length === 0
  ) {
    return (
      <S.Block>
        <S.Subtitle children="No orders found!" />
        <S.Title children="Start trading!" />
      </S.Block>
    )
  }

  return (
    <S.Wrapper>
      <S.OrdersTable>
        <S.OrdersHeader>
          <S.OrdersHeaderRow>
            <S.OrdersHeaderCell children="Amount" />
            <S.OrdersHeaderCell children="Sale Price/Token" />
            <S.OrdersHeaderCell children="Total Price" />

            <S.OrdersHeaderCell></S.OrdersHeaderCell>
          </S.OrdersHeaderRow>
        </S.OrdersHeader>

        <S.OrdersBody>
          {lotsList.items.map((lot, index) => {
            const total = lot.total / Math.pow(10, 9)
            const price = lot.price / Math.pow(10, 9)
            const totalInUsd = total * tonPrice
            const priceInUsd = price * tonPrice

            return (
              <S.OrderRow key={index} even={(index % 2 !== 0).toString()}>
                <S.OrderCell>{lot.amount}</S.OrderCell>
                <S.OrderCell>
                  {priceFilter === 'TON' &&
                    `${total.toFixed(9).replace(/\.?0+$/, '')} TON`}
                  {priceFilter === 'USD' &&
                    `${totalInUsd.toFixed(9).replace(/\.?0+$/, '')} USD`}
                </S.OrderCell>
                <S.OrderCell>
                  {priceFilter === 'TON' &&
                    `${price.toFixed(9).replace(/\.?0+$/, '')} TON`}
                  {priceFilter === 'USD' &&
                    `${priceInUsd.toFixed(9).replace(/\.?0+$/, '')} USD`}
                </S.OrderCell>
                <S.OrderCell>
                  <S.OrderActionButton
                    children="Cancel"
                    onClick={() => {
                      onCancelClick({
                        address: lot.address,
                        amount: lot.amount,
                        price: price,
                        priceInUSD: priceInUsd,
                        total: total,
                        totalInUSD: totalInUsd,
                        createdAt: lot.created_at,
                        closedAt: lot.closed_at,
                        seller: lot.seller,
                        buyer: lot.buyer,
                      })
                    }}
                  />
                </S.OrderCell>
              </S.OrderRow>
            )
          })}
        </S.OrdersBody>
      </S.OrdersTable>
      {lotsList && lotsList.total / ITEMS_ON_PAGE > 1 && (
        <Pagination
          currentPage={currentPage}
          onChange={handleChangePage}
          totalPages={lotsList.total / ITEMS_ON_PAGE}
        />
      )}
    </S.Wrapper>
  )
}
