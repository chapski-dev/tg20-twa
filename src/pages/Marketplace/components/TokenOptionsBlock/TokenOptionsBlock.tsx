import React, { FC, useCallback, useState } from 'react';
import { fromNano } from '@ton/core';
import { useQuery } from 'react-query';
import { getCurrentMaketplaceTicks, getMarketplaceTokenStats, getTokenInfo } from 'api';
import { MarketplaceTokenStats } from 'api/types';
import { useDebounce } from 'hooks/useDebounce/useDebounce';
import { useTelegram } from 'hooks/useTelegram/useTelegram';
import { MarketplaceTabsValueEnum } from 'pages/Marketplace/Marketplace';
import { Accordion } from 'ui';
import { SvgLoop, SvgToncoinIcon } from 'ui/icons';
import { Select } from 'ui/Select/Select';
import { convertNumberToShortFormat } from 'utils/convertNumberToShortFormat';
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators';
import { ButtonGroup } from './components';
import * as S from './style';

type TokenOptionsBlockProps = {
  onTokenChange: (tick: string) => void;
  onSortSelectChange: (sortValue: string) => void;
  sortSelectValue: string;
  tick: string;
  onListing: () => void;
  activeTab: MarketplaceTabsValueEnum;
  priceFilter: 'TON' | 'USD';
  onShowPriceIn: () => void;
};

export const TokenOptionsBlock: FC<TokenOptionsBlockProps> = (props) => {
  const { onTokenChange, onSortSelectChange, onListing, tick, activeTab, priceFilter, onShowPriceIn } = props;

  const {
    data: marketPlaceTicks,
    isSuccess: isMarketplaceTicksLoaded,
  } = useQuery(['currentMarketplaceTicks'], () => getCurrentMaketplaceTicks(), {
    select: (data: string[]) => data.map((item: string) => ({ label: item, value: item })),
  });

  const renderSpecificOption = () => {
    switch (activeTab) {
      case MarketplaceTabsValueEnum.LISTED:
        return <Listings onSortSelectChange={onSortSelectChange} tick={tick} />;
      case MarketplaceTabsValueEnum.ACTIVITIES:
        return (
          <Activities
            onShowPriceIn={onShowPriceIn}
            onSortSelectChange={onSortSelectChange}
            priceFilter={priceFilter}
            tick={tick}
          />
        );
      case MarketplaceTabsValueEnum.MY_ORDERS:
        return (
          <MyOrdres 
            onShowPriceIn={onShowPriceIn}
            onSortSelectChange={onSortSelectChange}
            priceFilter={priceFilter}
            tick={tick}
          />
        );
          
      default:
        return null;
    }
  };

  return (
    <S.Wrapper>
      <S.TokenSelectContentWrapper>
        {isMarketplaceTicksLoaded && (
          <Select
            onChange={(event) => onTokenChange(event.value)}
            options={marketPlaceTicks}
            value={marketPlaceTicks.find((el) => el.value === tick) as any}
          />
        )}
        <S.Button children="List order" onClick={onListing} />
      </S.TokenSelectContentWrapper>
      <div style={{ width: '100%' }}>
        {renderSpecificOption()}
      </div>
    </S.Wrapper>
  );
};

type ListingsProps = {
  tick: string;
  onSortSelectChange: (sortValue: string) => void;
};

const Listings: FC<ListingsProps> = (props) => {
  const { tick, onSortSelectChange } = props;

  const [searchedValue, setSearchedValue] = useState<string>('');

  const debauncedSearchValue = useDebounce(searchedValue); // eslint-disable-line

  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(evt.target.value);
  };

  const { tonPrice } = useTelegram();
  const { data: currentTickData, isLoading: isCurrentTickDataLoading } =
    useQuery(['currentStatsTokenTickDatad', tick], () => getTokenInfo(tick), { enabled: !!tick });

  const {
    data: marketplaceGramStats,
    isLoading: isMarketplaceGramStatsLoading,
  } = useQuery(
    ['makretplaceTokenStats', tick, tonPrice, currentTickData],
    () => getMarketplaceTokenStats({ tick }),
    {
      enabled: !!tick && !!tonPrice && !!currentTickData?.holders,
      select: useCallback(
        (data: MarketplaceTokenStats) => [
          {
            description: `~ $${formatNumberWithSeparators(
              tonPrice! * data.total_volume,
            )}`,
            label: 'Total Volume',
            value: data.total_volume,
          },
          {
            description: `~ $${formatNumberWithSeparators(
              tonPrice! * data.volume_24h,
            )}`,
            label: '24H Volume',
            value: data.volume_24h,
          },
          {
            description: `~ $${(
              tonPrice! * Number(fromNano(+data.floor_price.toFixed(0)))
            ).toFixed(7)}`,
            label: 'Floor Price',
            value: fromNano(+data.floor_price.toFixed(0)),
          },
          {
            description: `~ $${formatNumberWithSeparators(
              tonPrice! * data.market_cap,
            )}`,
            label: 'Market Cap',
            value: data.market_cap,
          },
          {
            description: `${convertNumberToShortFormat(
              data.total_operations,
            )} transactions`,
            label: 'Holders',
            value: currentTickData?.holders,
          },
          {
            description: '',
            label: 'Inscription Address',
            value: currentTickData?.address,
          },
        ],
        [currentTickData?.address, currentTickData?.holders, tonPrice],
      ),
    },
  );

  const isLoading = isMarketplaceGramStatsLoading && isCurrentTickDataLoading;

  return (
    <>
      <Accordion height="210px" title="Inscription Details">
        <S.InfoWrapper>
          {isLoading ? (
            <S.Loader />
          ) : (marketplaceGramStats?.map(({ label, value, description }, i) => (
            <S.InfoBlockWrapper key={label}>
              <S.Label $isAccent>{label}</S.Label>
              <S.BalanceBlock>
                {i !== marketplaceGramStats?.length - 1 ? (
                  <>
                    <SvgToncoinIcon />
                    {Number(value)}
                  </>
                ) : (
                  <S.Link
                    children={value}
                    href={`https://tonviewer.com/${value}`}
                    target="_blank"
                  />
                )}
              </S.BalanceBlock>
              <S.Label children={description} />
            </S.InfoBlockWrapper>
          ))
          )}
        </S.InfoWrapper>
      </Accordion>

      <S.StyledInput
        icon={<SvgLoop />}
        onChange={onChangeInput}
        placeholder="Search an order"
        value={searchedValue}
      />

      <S.Flex>
        {isLoading ? (
          <S.Loader />
        ) : (
          <S.Block>
            <S.BlockTitle>
              <span>{currentTickData?.tick}</span> {' '}
              Floor Price
            </S.BlockTitle>
            <S.BlockDescription children={`${marketplaceGramStats?.[2].value || 0} TON ${marketplaceGramStats?.[2].description || ''}`} />
          </S.Block>
        )}
        <Select
          onChange={(event) => onSortSelectChange(event.value)}
          options={sortOptions}
          value={sortOptions.find((el) => el.value === tick) as any}
        />
      </S.Flex>
    </>
  );
};

type MyOrdresProps = {
  tick: string;
  onSortSelectChange: (sortValue: string) => void;
  priceFilter: 'TON' | 'USD';
  onShowPriceIn: () => void;
};

const MyOrdres: FC<MyOrdresProps> = (props) => {
  const { tick, onSortSelectChange, priceFilter, onShowPriceIn } = props;

  return (
    <S.ActivitiesWrapper>
      <Select
        onChange={(event) => onSortSelectChange(event.value)}
        options={sortOptions}
        value={sortOptions.find((el) => el.value === tick) as any}
      />
      <ButtonGroup 
        activeFilter={priceFilter as any}
        onClick={onShowPriceIn}
      />
    </S.ActivitiesWrapper>
  );
};

type ActivitiesProps = {
  tick: string;
  onSortSelectChange: (sortValue: string) => void;
  priceFilter: 'TON' | 'USD';
  onShowPriceIn: () => void;
};

const Activities: FC<ActivitiesProps> = (props) => {
  const { tick, onSortSelectChange, priceFilter, onShowPriceIn } = props;

  return (
    <S.ActivitiesWrapper>
      <Select
        onChange={(event) => onSortSelectChange(event.value)}
        options={sortOptions}
        value={sortOptions.find((el) => el.value === tick) as any}
      />
      <ButtonGroup 
        activeFilter={priceFilter as any}
        onClick={onShowPriceIn}
      />
    </S.ActivitiesWrapper>
  );
};

const sortOptions = [
  {
    label: 'Created at (desc)',
    value: 'created_at_desc',
  },
  {
    label: 'Created at (asc)',
    value: 'created_at_asc',
  },
  {
    label: 'Price (desc)',
    value: 'price_per_unit_desc',
  },
  {
    label: 'Price (asc)',
    value: 'price_per_unit_asc',
  },
  {
    label: 'Amount (desc)',
    value: 'amount_desc',
  },
  {
    label: 'Amount (asc)',
    value: 'amount_asc',
  },
  {
    label: 'Total (desc)',
    value: 'total_cost_desc',
  },
  {
    label: 'Total (asc)',
    value: 'total_cost_asc',
  },
];
