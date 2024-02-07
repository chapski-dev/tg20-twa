import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTonAddress } from '@tonconnect/ui-react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { getPaginatedListedLots } from 'api';
import { LotSort, LotSortDirection, MarketplaceLot } from 'api/types';
import { useTelegram } from 'hooks/useTelegram/useTelegram';
import { LotInfo } from 'pages/Marketplace/Marketplace';
import { LotCard } from './components';
import * as S from './style';

type ListedLotsTabProps = {
  tick: string;
  sort: LotSort;
  direction: LotSortDirection;
  userBalance?: number;
  onBuyClick: (lotInfo: LotInfo) => void;
};

const ITEMS_ON_PAGE = 50;

export const ListedLotsTab: FC<ListedLotsTabProps> = (props) => {
  const { onBuyClick, tick, sort, direction } = props;

  const { tonPrice } = useTelegram();

  const [isWalletConnectionEstablished, setIsWalletConnectionEstablished] =
    useState(false);

  const address = useTonAddress();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsWalletConnectionEstablished(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [address]);

  const getListedLots = useCallback(
    async ({ pageParam = 0 }) =>
      getPaginatedListedLots(tick, {
        count: ITEMS_ON_PAGE,
        direction: direction,
        offset: pageParam * ITEMS_ON_PAGE,
        sort: sort,
      }),
    [direction, sort, tick],
  );

  const {
    data: listedLotsData,
    fetchNextPage,
    hasNextPage,
    isLoading: isListedLotsDataLoading,
    isError: isListedLotsDataError,
    isSuccess: isListedLotsDataLoaded,
    isFetchingNextPage: isListedLotsDataNextPageFetching,
  } = useInfiniteQuery(['listed-lots', tick, sort, direction], getListedLots, {
    getNextPageParam: (lastPage, pages) => {
      const { total } = lastPage;
      const currentTotalItems = pages.reduce((acc, page) => acc + page.items.length, 0);

      const isCurrentLessTotal = currentTotalItems < total;
      
      return isCurrentLessTotal ? currentTotalItems / ITEMS_ON_PAGE : undefined;
    },
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isListedLotsDataNextPageFetching) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isListedLotsDataNextPageFetching]);

  const listedLots = useMemo(() => {
    if (!listedLotsData) {
      return;
    }

    return listedLotsData.pages.flatMap((page) => page.items);
  }, [listedLotsData]);

  if (isListedLotsDataLoading || !isWalletConnectionEstablished) {
    return <S.Loader />;
  }

  if (isListedLotsDataError) {
    return (
      <S.Wrapper>
        <S.ErrorText>Error loading marketplace lots</S.ErrorText>
      </S.Wrapper>
    ); 
  }

  if (!tonPrice) {
    return <S.Loader />; 
  }

  return (
    <>
      {isListedLotsDataLoaded && listedLots && (
        <S.LotCardsWrapper>
          {listedLots.map((lot: MarketplaceLot, index) => (
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
                });
              }}
            />
          ))}
          <div ref={ref} />
        </S.LotCardsWrapper>
      )}
    </>
  );
};
