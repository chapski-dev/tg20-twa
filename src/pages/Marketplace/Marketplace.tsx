import React, { FC, useState, useMemo, useCallback } from 'react'
import { beginCell, toNano } from '@ton/core'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { getTokenWalletBalance } from 'api'
import { LotSort, LotSortDirection } from 'api/types'
import { HeaderUserBalance } from 'features/HeaderUserBalance'
import { MainButton } from 'features/MainButton'
import { useDebounce } from 'hooks/useDebounce/useDebounce'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { type Tab } from 'ui/Tabs/Tabs'
import { TransactionStatusModal } from 'ui/TransactionStatusModal/TransactionStatusModal'
import { TokenOptionsBlock } from './components'
import { ActivityDetailsPopup } from './components/ActivityDetailsPopup/ActivityDetailsPopup'
import { BuyLotPopup } from './components/BuyLotPopup/BuyLotPopup'
import { CancelLotPopup } from './components/CancelLotPopup/CancelLotPopup'
import { ConfirmLotPopup } from './components/ConfirmLotPopup/ConfirmLotPopup'
import { Tabs } from './components/Tab/Tab'
import * as S from './style'
import { ActivityTab } from './tabs/activity/ActivityTab'
import { ListedLotsTab } from './tabs/listed/ListedLotsTab'
import { MyOrdersTab } from './tabs/orders/MyOrdersTab'

export type LotInfo = {
  address: string
  amount: number
  price: number
  total: number
  priceInUSD: number
  totalInUSD: number
  seller: string
  buyer: string | null
  createdAt: number
  closedAt: number | null
}

type TTabs = Tab & { component: React.JSX.Element }

export enum MarketplaceTabsValueEnum {
  LISTED,
  MY_ORDERS,
  ACTIVITIES,
}

export const Marketplace: FC = () => {
  const [activeTab, setActiveTab] = useState<MarketplaceTabsValueEnum>(
    MarketplaceTabsValueEnum.LISTED
  )

  const address = useTonAddress()

  const [tonConnectUI] = useTonConnectUI()

  const [isConfirmLotModalOpen, setIsConfirmLotModalOpen] = useState(false)
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false)
  const [isOrderCancellationModalOpen, setIsOrderCancellationModalOpen] =
    useState(false)
  const [isActivityDetailsModalOpen, setIsActivityDetailsModalOpen] =
    useState(false)

  const [isTransactionStatusModalOpen, setIsTransactionStatusModalOpen] =
    useState(false)
  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(false)

  const [lotInfo, setLotInfo] = useState<LotInfo | null>(null)

  const [searchParams] = useSearchParams()

  const initialTick = searchParams.get('tick')

  const [tick, setTick] = useState<string>(initialTick || 'gram')
  const [sort, setSort] = useState<LotSort>('price_per_unit')
  const [direction, setDirection] = useState<LotSortDirection>('asc')

  const [lastSort, setLastSort] = useState<LotSort>('created_at')
  const [lastDirection, setLastDirection] = useState<LotSortDirection>('desc')

  const [lastActivitySort, setLastActivitySort] = useState<LotSort>('closed_at')
  const [lastActivityDirection, setLastActivityDirection] =
    useState<LotSortDirection>('desc')

  const [priceFilter, setPriceFilter] = useState<'TON' | 'USD'>('TON')

  const [searchedValue, setSearchedValue] = useState<string>('')

  const debauncedSearchValue = useDebounce(searchedValue)

  const onShowPriceIn = () =>
    setPriceFilter((prevSt) => (prevSt === 'TON' ? 'USD' : 'TON'))

  const { currentWalletBalance } = useTelegram()

  const updateSearchedValue = useCallback((value: string) => {
    setSearchedValue(value)
  }, [])

  const { data: currentWalletTickerData } = useQuery(
    ['currentTickerBalance', address, tick],
    () => getTokenWalletBalance(address, tick),
    {
      enabled: !!address,
    }
  )

  const handleBuyClick = useCallback(
    (lotInfoVal: LotInfo) => {
      if (!address) {
        tonConnectUI.openModal()
        return
      }
      setIsBuyModalOpen(true)
      setLotInfo(lotInfoVal)
    },
    [address, tonConnectUI]
  )

  const handleConfirmLotClick = useCallback(() => {
    if (isTransactionStatusModalOpen) {
      setIsTransactionStatusModalOpen(false)
      return
    }

    if (!address) {
      tonConnectUI.openModal()
      return
    }
    setIsConfirmLotModalOpen(true)
  }, [address, isTransactionStatusModalOpen, tonConnectUI])

  const handleCancelOrderClick = useCallback(
    (lotInfoVal: LotInfo) => {
      if (!address) {
        tonConnectUI.openModal()
        return
      }
      setIsOrderCancellationModalOpen(true)
      setLotInfo(lotInfoVal)
    },
    [address, tonConnectUI]
  )

  const handleActivityDetailsClick = useCallback((lotInfoVal: LotInfo) => {
    setIsActivityDetailsModalOpen(true)
    setLotInfo(lotInfoVal)
  }, [])

  const handleBuyConfirmation = useCallback(async () => {
    setIsBuyModalOpen(false)

    const tokenBuyBody = beginCell()
      .storeUint(0, 32)
      .storeStringTail('buy')
      .endCell()

    try {
      await tonConnectUI.sendTransaction(
        {
          messages: [
            {
              address: lotInfo!.address,
              amount: toNano(lotInfo!.total + 0.25).toString(),
              payload: tokenBuyBody.toBoc().toString('base64'),
            },
          ],
          validUntil: Math.floor(Date.now() / 1000) + 180,
        },
        { returnStrategy: 'none' }
      )
      setIsTransactionSuccessful(true)
    } catch (e) {
      setIsTransactionSuccessful(false)
    }

    setIsTransactionStatusModalOpen(true)
  }, [lotInfo, tonConnectUI])

  const handleCancelLot = useCallback(async () => {
    if (!isOrderCancellationModalOpen) {
      setIsTransactionStatusModalOpen(false)
      return
    }

    setIsOrderCancellationModalOpen(false)
    const cancelLotBody = beginCell()
      .storeUint(0, 32)
      .storeStringTail('cancel')
      .endCell()

    try {
      await tonConnectUI.sendTransaction(
        {
          messages: [
            {
              address: lotInfo!.address,
              amount: toNano('0.2').toString(),
              payload: cancelLotBody.toBoc().toString('base64'),
            },
          ],
          validUntil: Math.floor(Date.now() / 1000) + 180,
        },
        { returnStrategy: 'none' }
      )
      setIsTransactionSuccessful(true)
    } catch (e) {
      setIsTransactionSuccessful(false)
    }

    setIsTransactionStatusModalOpen(true)
  }, [isOrderCancellationModalOpen, lotInfo, tonConnectUI])

  const tabs: TTabs[] = useMemo(
    () => [
      {
        component: (
          <ListedLotsTab
            direction={direction}
            onBuyClick={handleBuyClick}
            searchedId={debauncedSearchValue}
            sort={sort}
            tick={tick}
            userBalance={currentWalletBalance}
          />
        ),
        label: 'Listed',
        value: MarketplaceTabsValueEnum.LISTED,
      },
      {
        component: (
          <MyOrdersTab
            address={address!}
            direction={direction}
            onCancelClick={handleCancelOrderClick}
            priceFilter={priceFilter}
            sort={sort}
            tick={tick}
          />
        ),
        label: 'My Orders',
        value: MarketplaceTabsValueEnum.MY_ORDERS,
      },
      {
        component: (
          <ActivityTab
            direction={direction}
            onDetailsClick={handleActivityDetailsClick}
            priceFilter={priceFilter}
            sort={sort}
            tick={tick}
          />
        ),
        label: 'Activities',
        value: MarketplaceTabsValueEnum.ACTIVITIES,
      },
    ],
    [
      address,
      currentWalletBalance,
      debauncedSearchValue,
      direction,
      handleActivityDetailsClick,
      handleBuyClick,
      handleCancelOrderClick,
      priceFilter,
      sort,
      tick,
    ]
  )

  const handleSortSelectChange = useCallback(
    (sortValue: string) => {
      const newSort = sortValue
        .replace('_asc', '')
        .replace('_desc', '') as LotSort
      const newDirection = sortValue.includes('desc') ? 'desc' : 'asc'

      setSort(newSort)
      setDirection(newDirection)

      if (activeTab === MarketplaceTabsValueEnum.LISTED) {
        setLastActivitySort(newSort)
        setLastActivityDirection(newDirection)
      } else {
        setLastSort(newSort)
        setLastDirection(newDirection)
      }
    },
    [activeTab]
  )

  return (
    <>
      <HeaderUserBalance />
      <S.Wrapper>
        <S.ActionsContainer>
          <Tabs
            onChange={(tab) => {
              setActiveTab(tab.value as MarketplaceTabsValueEnum)

              // we sort by closed_at desc by default on activities tab
              // so we need to save last sort and direction for listed and my orders tabs
              // and last activity sort and direction for activities tab
              if (tab.value === MarketplaceTabsValueEnum.MY_ORDERS) {
                setLastSort(sort)
                setLastDirection(direction)
                setSort(lastActivitySort)
                setDirection(lastActivityDirection)
                setLastActivitySort(lastActivitySort)
                setLastActivityDirection(lastActivityDirection)
              }

              if (tab.value !== MarketplaceTabsValueEnum.MY_ORDERS) {
                setSort(lastSort)
                setDirection(lastDirection)
              }
            }}
            selectedTab={tabs[activeTab]}
            tabs={tabs}
          />

          <TokenOptionsBlock
            activeTab={activeTab}
            debaunceSearchValue={searchedValue}
            onListing={handleConfirmLotClick}
            onSearchChange={updateSearchedValue}
            onShowPriceIn={onShowPriceIn}
            onSortSelectChange={handleSortSelectChange}
            onTokenChange={setTick}
            priceFilter={priceFilter}
            sortSelectValue={`${sort}_${direction}`}
            tick={tick}
          />
        </S.ActionsContainer>
        <S.TabContentWrapper>{tabs[activeTab].component}</S.TabContentWrapper>
        {isConfirmLotModalOpen && (
          <ConfirmLotPopup
            onClose={() => setIsConfirmLotModalOpen(false)}
            tick={tick}
            tokenBalance={currentWalletTickerData?.balance || 0}
            updateIsSuccessfulTransactionStatus={setIsTransactionSuccessful}
            updateSuccessfulPopupDisplayMode={setIsTransactionStatusModalOpen}
          />
        )}
        {isBuyModalOpen && (
          <BuyLotPopup
            fromAmount={lotInfo!.amount * lotInfo!.price}
            handleBuyConfirmation={handleBuyConfirmation}
            onClose={() => setIsBuyModalOpen(false)}
            priceTon={lotInfo!.price}
            priceUsd={lotInfo!.priceInUSD}
            ticker={tick}
            toAmount={lotInfo!.amount}
            total={lotInfo!.total}
          />
        )}
        {isOrderCancellationModalOpen && (
          <CancelLotPopup
            amount={lotInfo!.amount}
            onClose={() => setIsOrderCancellationModalOpen(false)}
            onConfirm={() => setIsOrderCancellationModalOpen(false)}
            price={lotInfo!.price}
            priceUsd={lotInfo!.priceInUSD}
            ticker={tick}
            total={lotInfo!.total}
            totalUsd={lotInfo!.totalInUSD}
          />
        )}
        {isActivityDetailsModalOpen && (
          <ActivityDetailsPopup
            address={lotInfo!.buyer!}
            amount={lotInfo!.amount}
            date={new Date(lotInfo!.closedAt! * 1000)}
            onClose={() => setIsActivityDetailsModalOpen(false)}
            onConfirm={() => setIsActivityDetailsModalOpen(false)}
            ticker={tick}
          />
        )}
        {isTransactionStatusModalOpen && (
          <TransactionStatusModal
            onClose={() => setIsTransactionStatusModalOpen(false)}
            success={isTransactionSuccessful}
          />
        )}
        <RenderMainButton
          activeTab={activeTab}
          handleCancelLot={handleCancelLot}
          isOrderCancellationModalOpen={isOrderCancellationModalOpen}
          isTransactionStatusModalOpen={isTransactionStatusModalOpen}
        />
      </S.Wrapper>
    </>
  )
}

type RenderMainButtonProps = {
  activeTab: MarketplaceTabsValueEnum
  isTransactionStatusModalOpen: boolean
  isOrderCancellationModalOpen: boolean
  handleCancelLot: () => void
}
const RenderMainButton: FC<RenderMainButtonProps> = ({
  activeTab,
  isTransactionStatusModalOpen,
  isOrderCancellationModalOpen,
  handleCancelLot,
}) => {
  const theme = useTheme()

  switch (true) {
    case (activeTab === MarketplaceTabsValueEnum.MY_ORDERS &&
      isOrderCancellationModalOpen) ||
      (activeTab === MarketplaceTabsValueEnum.MY_ORDERS &&
        isTransactionStatusModalOpen):
      return (
        <MainButton
          color={
            isOrderCancellationModalOpen ? theme.color.redAlert : undefined
          }
          onClick={handleCancelLot}
          text={isOrderCancellationModalOpen ? 'Cancel listing' : 'Close'}
        />
      )
    default:
      return null
  }
}
