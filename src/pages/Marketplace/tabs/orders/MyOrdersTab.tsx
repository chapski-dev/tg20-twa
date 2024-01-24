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
  onCancelClick: (lot: LotInfo) => void
}

const ITEMS_ON_PAGE = 10

export const MyOrdersTab: FC<MyOrdersTabProps> = (props) => {
  const { onCancelClick, tick, sort, direction, address } = props

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

  if (isError)
    return (
      <S.Wrapper>
        <S.ErrorText>Error loading your orders</S.ErrorText>
      </S.Wrapper>
    )

  return (
    <S.Wrapper>
      <S.OrdersTable>
        <S.OrdersHeader>
          <S.OrdersHeaderRow>
            <S.OrdersHeaderCell>Total Value</S.OrdersHeaderCell>
            <S.OrdersHeaderCell>Price</S.OrdersHeaderCell>
            <S.OrdersHeaderCell>Amount</S.OrdersHeaderCell>
            <S.OrdersHeaderCell></S.OrdersHeaderCell>
          </S.OrdersHeaderRow>
        </S.OrdersHeader>

        <S.OrdersBody>
          {isSuccess &&
            lotsList.items &&
            lotsList.items.map((lot, index) => {
              const total = lot.total / Math.pow(10, 9)
              const price = lot.price / Math.pow(10, 9)
              const totalInUsd = total * tonPrice
              const priceInUsd = price * tonPrice

              return (
                <S.OrderRow key={index} even={(index % 2 === 0).toString()}>
                  <S.OrderCell>
                    {total.toFixed(9).replace(/\.?0+$/, '')} TON
                  </S.OrderCell>
                  <S.OrderCell>
                    {price.toFixed(9).replace(/\.?0+$/, '')} TON
                  </S.OrderCell>
                  <S.OrderCell>{lot.amount}</S.OrderCell>
                  <S.OrderCell>
                    <S.OrderActionButton
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
                    >
                      Cancel
                    </S.OrderActionButton>
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
