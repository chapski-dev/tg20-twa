import { FC, useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { getTonPrice, getPaginatedActivities } from 'api'
import { LotSort, LotSortDirection } from 'api/types'
import { LotInfo } from 'pages/Marketplace/Marketplace'
import { Pagination } from 'ui/Pagination/Pagination'
import * as S from './style'

type ActivityTabProps = {
  tick: string
  sort: LotSort
  direction: LotSortDirection
  onDetailsClick: (lot: LotInfo) => void
}

const ITEMS_ON_PAGE = 10

export const ActivityTab: FC<ActivityTabProps> = ({
  tick,
  sort,
  direction,
  onDetailsClick,
}) => {
  const { data: tonPrice } = useQuery(['currentTonPrice'], () => getTonPrice())

  const [currentPage, setCurrentPage] = useState<number>(1)

  const handleChangePage = useCallback((page: number) => {
    setCurrentPage(page + 1)
  }, [])

  const {
    data: activitiesList,
    isLoading,
    isSuccess,
    isError,
  } = useQuery(
    ['my-lots', currentPage, tick, sort, direction],
    () =>
      getPaginatedActivities(tick, {
        count: ITEMS_ON_PAGE,
        offset: (currentPage - 1) * ITEMS_ON_PAGE,
        sort: sort,
        direction: direction,
      }),
    {
      enabled: !!tick,
    }
  )

  if (isLoading) return <S.EndLoader />

  if (isError)
    return (
      <S.Wrapper>
        <S.ErrorText>Error loading recent activity</S.ErrorText>
      </S.Wrapper>
    )

  return (
    <S.Wrapper>
      <S.ActivityTable>
        <S.ActivitiesHeader>
          <S.ActivitiesHeaderRow>
            <S.ActivitiesHeaderCell>Total</S.ActivitiesHeaderCell>
            <S.ActivitiesHeaderCell>Price</S.ActivitiesHeaderCell>
            <S.ActivitiesHeaderCell>Amount</S.ActivitiesHeaderCell>
            <S.ActivitiesHeaderCell></S.ActivitiesHeaderCell>
          </S.ActivitiesHeaderRow>
        </S.ActivitiesHeader>

        <S.ActivitiesBody>
          {isSuccess &&
            activitiesList.items &&
            activitiesList.items.map((lot, index) => {
              const total = lot.total / Math.pow(10, 9)
              const price = lot.price / Math.pow(10, 9)
              const totalInUsd = total * tonPrice
              const priceInUsd = price * tonPrice

              return (
                <S.ActivityRow key={index} even={(index % 2 === 0).toString()}>
                  <S.ActivityCell>
                    {total.toFixed(9).replace(/\.?0+$/, '')} TON
                  </S.ActivityCell>
                  <S.ActivityCell>
                    {price.toFixed(9).replace(/\.?0+$/, '')} TON
                  </S.ActivityCell>
                  <S.ActivityCell>{lot.amount}</S.ActivityCell>
                  <S.ActivityCell>
                    <S.ActivityActionButton
                      onClick={() => {
                        onDetailsClick({
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
                      Details
                    </S.ActivityActionButton>
                  </S.ActivityCell>
                </S.ActivityRow>
              )
            })}
        </S.ActivitiesBody>
      </S.ActivityTable>
      {activitiesList && activitiesList.total / ITEMS_ON_PAGE > 1 && (
        <Pagination
          currentPage={currentPage}
          onChange={handleChangePage}
          totalPages={activitiesList.total / ITEMS_ON_PAGE}
        />
      )}
    </S.Wrapper>
  )
}
