import { FC, useState, useMemo, useCallback } from 'react'
import { beginCell, toNano } from '@ton/core'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { getTokenWalletBalance } from 'api'
import { LotSort, LotSortDirection } from 'api/types'
import { BackButton } from 'features/BackButton'
import { MainButton } from 'features/MainButton'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { TransactionStatusModal } from 'ui/TransactionStatusModal/TransactionStatusModal'
import { TokenOptionsBlock } from './components'
import { ActivityDetailsPopup } from './components/ActivityDetailsPopup/ActivityDetailsPopup'
import { BuyLotPopup } from './components/BuyLotPopup/BuyLotPopup'
import { CancelLotPopup } from './components/CancelLotPopup/CancelLotPopup'
import { ConfirmLotPopup } from './components/ConfirmLotPopup/ConfirmLotPopup'
import { Tab } from './components/Tab/Tab'
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

type Tabs = {
  name: string;
  value: MarketplaceTabsValueEnum;
  component: React.JSX.Element;
}[]

enum MarketplaceTabsValueEnum {
  LISTED = 'LISTED',
  MY_ORDERS = 'MY_ORDERS',
  ACTIVITIES = 'ACTIVITIES',
}


export const Marketplace: FC = () => {
  const [activeTab, setActiveTab] = useState<MarketplaceTabsValueEnum>(MarketplaceTabsValueEnum.LISTED);

  const navigate = useNavigate()
  const address = useTonAddress()

  const [tonConnectUI] = useTonConnectUI()

  const [isConfirmLotModalOpen, setIsConfirmLotModalOpen] = useState(false)
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false)
  const [isOrderCancellationModalOpen, setIsOrderCancellationModalOpen] = useState(false)
  const [isActivityDetailsModalOpen, setIsActivityDetailsModalOpen] = useState(false)

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(false)

  const [lotInfo, setLotInfo] = useState<LotInfo | null>(null)

  const [tick, setTick] = useState<string>('gram')
  const [sort, setSort] = useState<LotSort>('price_per_unit')
  const [direction, setDirection] = useState<LotSortDirection>('asc')

  const [lastSort, setLastSort] = useState<LotSort>('created_at')
  const [lastDirection, setLastDirection] = useState<LotSortDirection>('desc')

  const [lastActivitySort, setLastActivitySort] = useState<LotSort>('closed_at')
  const [lastActivityDirection, setLastActivityDirection] = useState<LotSortDirection>('desc')

  const { currentWalletBalance } = useTelegram()

  const { data: currentWalletTickerData } = useQuery(
    ['currentTickerBalance', address, tick],
    () => getTokenWalletBalance(address, tick),
    {
      enabled: !!address,
    }
  )

  const handleBuyClick = useCallback(
    (lotInfo: LotInfo) => {
      if (!address) {
        tonConnectUI.openModal()
        return
      }
      setIsBuyModalOpen(true)
      setLotInfo(lotInfo)
    }, [address, tonConnectUI]);

  const handleConfirmLotClick = useCallback(() => {
    if (isTransactionModalOpen) {
      setIsTransactionModalOpen(false)
      return;
    };

    if (!address) {
      tonConnectUI.openModal()
      return
    }
    setIsConfirmLotModalOpen(true)
  }, [address, isTransactionModalOpen, tonConnectUI])

  const handleCancelOrderClick = useCallback(
    (lotInfo: LotInfo) => {
      if (!address) {
        tonConnectUI.openModal()
        return
      }
      setIsOrderCancellationModalOpen(true)
      setLotInfo(lotInfo)
    }, [address, tonConnectUI]);

  const handleActivityDetailsClick = useCallback(
    (lotInfo: LotInfo) => {
      setIsActivityDetailsModalOpen(true)
      setLotInfo(lotInfo)
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
          validUntil: Math.floor(Date.now() / 1000) + 180,
          messages: [
            {
              address: lotInfo!.address,
              amount: toNano(lotInfo!.total + 0.25).toString(),
              payload: tokenBuyBody.toBoc().toString('base64'),
            },
          ],
        },
        {
          returnStrategy: 'none',
        }
      )
      setIsTransactionSuccessful(true)
    } catch (e) {
      setIsTransactionSuccessful(false)
    }

    setIsTransactionModalOpen(true)
  }, [lotInfo, tonConnectUI])

  const handleCancelLot = useCallback(async () => {
    if (!isOrderCancellationModalOpen) {
      setIsTransactionModalOpen(false);
      return;
    };

    setIsOrderCancellationModalOpen(false)
    const cancelLotBody = beginCell()
      .storeUint(0, 32)
      .storeStringTail('cancel')
      .endCell()

    try {
      await tonConnectUI.sendTransaction(
        {
          validUntil: Math.floor(Date.now() / 1000) + 180,
          messages: [
            {
              address: lotInfo!.address,
              amount: toNano('0.2').toString(),
              payload: cancelLotBody.toBoc().toString('base64'),
            },
          ],
        },
        {
          returnStrategy: 'none',
        }
      )
      setIsTransactionSuccessful(true)
    } catch (e) {
      setIsTransactionSuccessful(false)
    }

    setIsTransactionModalOpen(true)
  }, [isOrderCancellationModalOpen, lotInfo, tonConnectUI])

  const tabs: Tabs = useMemo(
    () => [
      {
        name: 'Listed',
        value: MarketplaceTabsValueEnum.LISTED,
        component: (
          <ListedLotsTab
            direction={direction}
            onBuyClick={handleBuyClick}
            sort={sort}
            tick={tick}
            userBalance={currentWalletBalance}
          />
        ),
      },
      {
        name: 'My Orders',
        value: MarketplaceTabsValueEnum.MY_ORDERS,
        component: (
          <MyOrdersTab
            address={address!}
            direction={direction}
            onCancelClick={handleCancelOrderClick}
            sort={sort}
            tick={tick}
          />
        ),
      },
      {
        name: 'Activities',
        value: MarketplaceTabsValueEnum.ACTIVITIES,
        component: (
          <ActivityTab
            direction={direction}
            onDetailsClick={handleActivityDetailsClick}
            sort={sort}
            tick={tick}
          />
        ),
      },
    ],
    [
      address,
      currentWalletBalance,
      direction,
      handleActivityDetailsClick,
      handleBuyClick,
      handleCancelOrderClick,
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
    }, [activeTab])

  return (
    <S.Wrapper>
      <BackButton onClick={() => navigate(-1)} />

      <S.FiltersContainer>
        <S.TabsWrapper>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              isActive={activeTab === tab.value}
              name={tab.name}
              onClick={() => {
                setActiveTab(tab.value)

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
            />
          ))}
        </S.TabsWrapper>

        <TokenOptionsBlock
          onSortSelectChange={handleSortSelectChange}
          onTokenChange={setTick}
          sortSelectValue={`${sort}_${direction}`}
          tick={tick}
        />
      </S.FiltersContainer>

      <S.TabContentWrapper>{tabs?.find((el) => el?.value === activeTab)?.component}</S.TabContentWrapper>

      {isConfirmLotModalOpen && (
        <ConfirmLotPopup
          onClose={() => setIsConfirmLotModalOpen(false)}
          tick={tick}
          tokenBalance={currentWalletTickerData?.balance || 0}
          updateIsSuccessfulTransactionStatus={setIsTransactionSuccessful}
          updateSuccessfulPopupDisplayMode={setIsTransactionModalOpen}
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

      {isTransactionModalOpen && (
        <TransactionStatusModal
          onClose={() => setIsTransactionModalOpen(false)}
          success={isTransactionSuccessful}
        />
      )}
      <RenderMainButton
        activeTab={activeTab}
        handleCancelLot={handleCancelLot}
        handleConfirmLotClick={handleConfirmLotClick}
        isActivityDetailsModalOpen={isActivityDetailsModalOpen}
        isBuyModalOpen={isBuyModalOpen}
        isConfirmLotModalOpen={isConfirmLotModalOpen}
        isOrderCancellationModalOpen={isOrderCancellationModalOpen}
        isTransactionModalOpen={isTransactionModalOpen}
        setIsActivityDetailsModalOpen={setIsActivityDetailsModalOpen}
      />
    </S.Wrapper>
  )
}

type RenderMainButtonProps = {
  activeTab: MarketplaceTabsValueEnum,
  isConfirmLotModalOpen: boolean,
  isBuyModalOpen: boolean,
  isTransactionModalOpen: boolean,
  isOrderCancellationModalOpen: boolean,
  isActivityDetailsModalOpen: boolean,
  handleConfirmLotClick: () => void,
  handleCancelLot: () => void,
  setIsActivityDetailsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const RenderMainButton: FC<RenderMainButtonProps> = ({
  activeTab,
  isConfirmLotModalOpen,
  isBuyModalOpen,
  isTransactionModalOpen,
  isOrderCancellationModalOpen,
  isActivityDetailsModalOpen,
  handleConfirmLotClick,
  handleCancelLot,
  setIsActivityDetailsModalOpen
}) => {
  const theme = useTheme()

  switch (true) {
    case activeTab === MarketplaceTabsValueEnum.LISTED && !isConfirmLotModalOpen && !isBuyModalOpen:
      return (
        <MainButton
          onClick={handleConfirmLotClick}
          text={isTransactionModalOpen ? 'Close' : 'List'}
        />
      )
    case activeTab === MarketplaceTabsValueEnum.MY_ORDERS && isOrderCancellationModalOpen ||
      activeTab === MarketplaceTabsValueEnum.MY_ORDERS && isTransactionModalOpen:
      return (
        <MainButton
          color={isOrderCancellationModalOpen ? theme.color.redAlert : undefined}
          onClick={handleCancelLot}
          text={isOrderCancellationModalOpen ? 'Cancel listing' : 'Close'}
        />
      )
    case activeTab === MarketplaceTabsValueEnum.ACTIVITIES && isActivityDetailsModalOpen:
      return (
        <MainButton
          onClick={() => setIsActivityDetailsModalOpen(false)}
          text="Close"
        />
      )
    default:
      return null;
  }
}
