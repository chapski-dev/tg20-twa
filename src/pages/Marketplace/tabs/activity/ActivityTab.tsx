import { FC, useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { getTonPrice, getPaginatedActivities } from 'api';
import { LotSort, LotSortDirection } from 'api/types';
import { LotInfo } from 'pages/Marketplace/Marketplace';
import { Pagination } from 'ui/Pagination/Pagination';
import * as S from './style';

type ActivityTabProps = {
  tick: string;
  sort: LotSort;
  direction: LotSortDirection;
  onDetailsClick: (lot: LotInfo) => void;
  priceFilter: 'TON' | 'USD';
};

const ITEMS_ON_PAGE = 10;

export const ActivityTab: FC<ActivityTabProps> = ({
  tick,
  sort,
  direction,
  onDetailsClick,
  priceFilter,
}) => {
  const { data: tonPrice } = useQuery(['currentTonPrice'], () => getTonPrice());

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChangePage = useCallback((page: number) => {
    setCurrentPage(page + 1);
  }, []);

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
        direction,
        offset: (currentPage - 1) * ITEMS_ON_PAGE,
        sort,
      }),
    {
      enabled: !!tick,
    },
  );

  if (isLoading) {
    return <S.EndLoader />;
  }

  if (isError) {
    return (
      <S.Wrapper>
        <S.ErrorText children="Error loading recent activity" />
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.ActivityTable>
        <S.ActivitiesHeader>
          <S.ActivitiesHeaderRow>
            <S.ActivitiesHeaderCell children="Token Value" />
            <S.ActivitiesHeaderCell children="Price/Token" />
            <S.ActivitiesHeaderCell children="Total price " />
            <S.ActivitiesHeaderCell />
          </S.ActivitiesHeaderRow>
        </S.ActivitiesHeader>

        <S.ActivitiesBody>
          {isSuccess &&
            activitiesList.items &&
            activitiesList.items.map((lot, index) => {
              const total = lot.total / Math.pow(10, 9);
              const price = lot.price / Math.pow(10, 9);
              const totalInUsd = total * tonPrice;
              const priceInUsd = price * tonPrice;
              const priceToken = priceFilter === 'USD' ? `${priceInUsd.toFixed(9).replace(/\.?0+$/, '')} USD` : `${price.toFixed(9).replace(/\.?0+$/, '')} TON`;
              
              const totalPrice = priceFilter === 'USD' ? `${totalInUsd.toFixed(9).replace(/\.?0+$/, '')} USD` : `${total.toFixed(9).replace(/\.?0+$/, '')} TON`;

              return (
                <S.ActivityRow key={index} even={index % 2 === 0}>
                  <S.ActivityCell children={lot.amount} />
                  <S.ActivityCell children={priceToken} />
                  <S.ActivityCell children={totalPrice} />
                  <S.ActivityCell>
                    <S.ActivityActionButton
                      children="View Detail"
                      onClick={() => {
                        onDetailsClick({
                          address: lot.address,
                          amount: lot.amount,
                          buyer: lot.buyer,
                          closedAt: lot.closed_at,
                          createdAt: lot.created_at,
                          price: price,
                          priceInUSD: priceInUsd,
                          seller: lot.seller,
                          total: total,
                          totalInUSD: totalInUsd,
                        });
                      }}
                    />
                  </S.ActivityCell>
                </S.ActivityRow>
              );
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
  );
};
