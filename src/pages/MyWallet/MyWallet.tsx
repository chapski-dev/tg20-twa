import { FC, useMemo, useState } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import { PromoSlider } from 'features/PromoSlider/PromoSlider'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { promoSlides } from 'mocks/promosMock'
import { Container } from 'ui/Container/Container'
import {
  SvgArrowSwap,
  SvgIconWalletTg,
  SvgLogout,
  SvgRecieveSquare,
} from 'ui/icons'

import { type Tab } from 'ui/TabsFilled/TabsFilled'
import { MyAssets } from './components'
import { MyTransactions } from './components/MyTransfers/MyTransfers'
import { NotAuthorized } from './components/NotAuthorized/NotAuthorized'
// import { PROCENT_MOCK } from './mock'
import * as S from './style'
import { ReceivePopup } from '../../ui/ReceivePopup/ReceivePopup'

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

  const navigate = useNavigate()

  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState<boolean>(false)

  const toggleRecieveModal = () => {
    setIsReceiveModalOpen((prev) => !prev)
  }

  const [showSwapBtn, setShowSwapBtn] = useState(false)

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
        <S.BalanceBlock>
          <S.BalanceBlockInner>
            <S.LogoutBlock>
              <S.LogOut
                onClick={() => {
                  tonConnectUI.disconnect()
                }}
              >
                <SvgLogout />
              </S.LogOut>
            </S.LogoutBlock>
            <S.TotlaBalance>Total Balance</S.TotlaBalance>
            <S.Balance>${currentWalletBalance}</S.Balance>
            <S.InfoChange>
              {/* <S.Time>24h change</S.Time> */}
              {/* <S.Procent>{PROCENT_MOCK.procent}%</S.Procent> */}
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
        <S.RecieveBlockWrapper onClick={toggleRecieveModal}>
          <S.RecieveButton>
            <SvgRecieveSquare />
          </S.RecieveButton>
          <S.RecieveText>Recieve</S.RecieveText>
        </S.RecieveBlockWrapper>
        {typeof currentWalletBalance === 'number' &&
        currentWalletBalance > 0 &&
        showSwapBtn ? (
          <S.SwapBlockWrapper onClick={() => navigate(AppRoutes.Swap)}>
            <S.SwapButton>
              <SvgArrowSwap />
            </S.SwapButton>
            <S.SwapText>Swap</S.SwapText>
          </S.SwapBlockWrapper>
        ) : null}
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

      {isReceiveModalOpen && <ReceivePopup onClose={toggleRecieveModal} />}

      {/* <div onClick={() => navigate(AppRoutes.TranferHistory)}>
        TransferHistory
      </div> */}
    </S.Wrapper>
  )
}
