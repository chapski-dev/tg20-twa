import { FC, useMemo, useState } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { QRCodeSVG } from 'qrcode.react'
import { theme } from 'assets/style/theme'
import { MainButton } from 'features/MainButton'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { Modal } from 'ui'
import { Container } from 'ui/Container/Container'
import {
  SvgArrowSwap,
  SvgIconWalletTg,
  SvgLogout,
  SvgRecieveSquare,
  SvgSearch,
} from 'ui/icons'

import { type Tab } from 'ui/TabsFilled/TabsFilled'
import { MyAssets, PromoSlider } from './components'
import { MyTransactions } from './components/MyTransfers/MyTransfers'
import { NotAuthorized } from './components/NotAuthorized/NotAuthorized'
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

  const [isOpenModalRecieve, setIsOpenModalRecieve] = useState(false)

  const openModal = () => {
    setIsOpenModalRecieve(true)
  }
  const closeModal = () => {
    setIsOpenModalRecieve(false)
  }

  const copyWalletAddress = async () => {
    try {
      await navigator.clipboard.writeText(userWalletAddress)
      alert('Address copied!')
    } catch (error) {
      console.error('Failed to copy address to clipboard:', error)
    }
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
        <S.RecieveBlockWrapper onClick={openModal}>
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

      {isOpenModalRecieve && (
        <Modal onClose={closeModal}>
          <S.WrapperModal>
            <S.TitleModal>Recieve</S.TitleModal>
            <S.QrCodeWrapper>
              <QRCodeSVG value={userWalletAddress} />
            </S.QrCodeWrapper>
            <S.CopyBtn>
              <MainButton
                color={theme.color.greenSuccess}
                onClick={copyWalletAddress}
                text="Copy"
              />
            </S.CopyBtn>
          </S.WrapperModal>
        </Modal>
      )}

      {/* <div onClick={() => navigate(AppRoutes.TranferHistory)}>
        TransferHistory
      </div> */}
    </S.Wrapper>
  )
}
