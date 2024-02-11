import { FC, useMemo, useState } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { Router, useNavigate } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import { BackButton } from 'features/BackButton'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { Container } from 'ui/Container/Container'
import {
  SvgArrowSwap,
  SvgIconWalletTg,
  SvgLogout,
  SvgRecieveSquare,
  SvgSearch,
  SvgSendSquare,
} from 'ui/icons'

import { type Tab } from 'ui/TabsFilled/TabsFilled'
import { MyAssets, MyTransfers, PromoSlider } from './components'
import { NotAuthorized } from './components/NotAuthorized/NotAuthorized'
import { PROCENT_MOCK } from './mock'
import * as S from './style'

const tabs: Tab[] = [
  {
    label: 'Assets',
    value: 'assets',
  },
  {
    label: 'Transfers',
    value: 'transfers',
  },
]

export const MyWallet: FC = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0])

  const userWalletAddress = useTonAddress()

  const { currentWalletBalance } = useTelegram()

  const navigate = useNavigate()

  const [tonConnectUI] = useTonConnectUI()

  const currentWalletContent = useMemo(() => {
    if (currentTab.value === 'assets') {
      return <MyAssets />
    }

    return <MyTransfers />
  }, [currentTab.value])

  if (!userWalletAddress) {
    return <NotAuthorized />
  }

  return (
    <S.Wrapper>
      <BackButton onClick={() => navigate(-1)} />
      <S.TopWrapperBlock>
        <S.TopBlock>
          <S.Search>
            <S.SearchInput
              icon={<SvgSearch />}
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
        <S.SendBlockWrapper onClick={() => alert('Send button')}>
          <S.SendButton>
            <SvgSendSquare />
          </S.SendButton>
          <S.SendText>Send</S.SendText>
        </S.SendBlockWrapper>
        <S.RecieveBlockWrapper onClick={() => alert('Recieve button')}>
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

      <S.CarouselContainer>
        <PromoSlider />
      </S.CarouselContainer>

      <Container>
        <S.TabsBlock>
          <S.CustomTab
            containerClassName="tabs"
            onChange={setCurrentTab}
            selectedTab={currentTab}
            tabs={tabs}
          />
          {currentWalletContent}
        </S.TabsBlock>
      </Container>

      {/* <div onClick={() => navigate(AppRoutes.TranferHistory)}>
        TransferHistory
      </div> */}
    </S.Wrapper>
  )
}
