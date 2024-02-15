import { FC, useMemo, useState } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { PromoSlider } from 'features/PromoSlider/PromoSlider'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { promoSlides } from 'mocks/promosMock'
import { Container } from 'ui/Container/Container'
import {
  SvgArrowSwap,
  SvgIconWalletTg,
  SvgLogout,
  SvgRecieveSquare,
  SvgSearch,
} from 'ui/icons'

import { type Tab } from 'ui/TabsFilled/TabsFilled'
import { MyAssets } from './components'
import { MyTransactions } from './components/MyTransfers/MyTransfers'
import { NotAuthorized } from './components/NotAuthorized/NotAuthorized'
import { ReceivePopup } from './components/ReceivePopup/ReceivePopup'
import { PROCENT_MOCK } from './mock'
import * as S from './style'

const tabs: Tab[] = [
  {
    label: 'Assets',
    value: 'assets',
  },
  {
    label: 'Transactions',
    value: 'transactions',
  },
]

export const MyWallet: FC = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0])

  const userWalletAddress = useTonAddress()

  const { currentWalletBalance } = useTelegram()

  const [tonConnectUI] = useTonConnectUI()

  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState<boolean>(false)

  const toggleReceiveModal = () => {
    setIsReceiveModalOpen((prev) => !prev)
  }

  const currentWalletContent = useMemo(() => {
    if (currentTab.value === 'assets') {
      return <MyAssets />
    }

    return <MyTransactions />
  }, [currentTab.value])

  if (!userWalletAddress) {
    return <NotAuthorized />
  }

  return (
    <S.Wrapper>
      <S.TopWrapperBlock>
        <S.TopBlock>
          <S.Search>
            <S.SearchInput
              icon={<SvgSearch />}
              isSearchInput={false}
              onChange={() => {}}
              placeholder="Search tokens"
            />
          </S.Search>
          <S.LogOut
            onClick={() => {
              tonConnectUI.disconnect()
            }}
          >
            <SvgLogout />
          </S.LogOut>
        </S.TopBlock>
        <S.BalanceBlock>
          <S.BalanceBlockInner>
            <S.TotlaBalance>Total Balance</S.TotlaBalance>
            <S.Balance>${currentWalletBalance}</S.Balance>
            <S.InfoChange>
              <S.Time>24h change</S.Time>
              <S.Procent>{PROCENT_MOCK.procent}%</S.Procent>
            </S.InfoChange>
            <S.SvgRightDown>
              <SvgIconWalletTg />
            </S.SvgRightDown>
          </S.BalanceBlockInner>
        </S.BalanceBlock>
      </S.TopWrapperBlock>
      <S.WalletFunctions>
        {/* <S.SendBlockWrapper onClick={() => alert('Send button')}>
          <S.SendButton>
            <SvgSendSquare />
          </S.SendButton>
          <S.SendText>Send</S.SendText>
        </S.SendBlockWrapper> */}
        <S.RecieveBlockWrapper onClick={toggleReceiveModal}>
          <S.RecieveButton>
            <SvgRecieveSquare />
          </S.RecieveButton>
          <S.RecieveText>Recieve</S.RecieveText>
        </S.RecieveBlockWrapper>
        <S.SwapBlockWrapper onClick={() => alert('Swap button')}>
          <S.SwapButton>
            <SvgArrowSwap />
          </S.SwapButton>
          <S.SwapText>Swap</S.SwapText>
        </S.SwapBlockWrapper>
      </S.WalletFunctions>
      <S.Line />

      <PromoSlider slides={promoSlides} />

      <S.TabsBlock>
        <Container>
          <S.Tabs
            containerClassName="tabs"
            onChange={setCurrentTab}
            selectedTab={currentTab}
            tabs={tabs}
          />
        </Container>

        {currentWalletContent}
      </S.TabsBlock>

      {isReceiveModalOpen && <ReceivePopup onClose={toggleReceiveModal} />}

      {/* <div onClick={() => navigate(AppRoutes.TranferHistory)}>
        TransferHistory
      </div> */}
    </S.Wrapper>
  )
}
