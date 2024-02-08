import { FC, useMemo, useState } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { BackButton } from 'features/BackButton'
import { MainButton } from 'features/MainButton'
import { useClipboard } from 'hooks/useClipboard/useClipboard'
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

import { Promo } from 'ui/Promo'
import { PromoProps } from 'ui/Promo/type'
import { type Tab } from 'ui/TabsFilled/TabsFilled'
import { MyAssets, MyTransfers } from './components'
import { PROCENT_MOCK } from './mock'
import { shortenAddress } from 'utils/shortenAddress'
import { MyAssets, MyTransfers, BalancesBlock } from './components'
import { NotAuthorized } from './components/NotAuthorized/NotAuthorized'
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

type PromoSlidesProps = PromoProps & {
  id: number
}

const promoSlides: PromoSlidesProps[] = [
  {
    id: 1,
    title: 'Add Crypto from Binance or Coinbase',
    subtitle: 'Deposit now',
    variant: 'yellow',
  },
  {
    id: 2,
    title: 'See what’s new in your wallet!',
    subtitle: 'Explore wallet',
    variant: 'purple',
  },
  {
    id: 3,
    title: 'Add Crypto from Binance or Coinbase',
    subtitle: 'Deposit now',
    variant: 'yellow',
  },
  {
    id: 4,
    title: 'See what’s new in your wallet!',
    subtitle: 'Explore wallet',
    variant: 'purple',
  },
]

export const MyWallet: FC = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0])

  const userWalletAddress = useTonAddress()

  const { currentGramBalance, currentWalletBalance, tonPrice } = useTelegram()

  const navigate = useNavigate()

  const clipboard = useClipboard()

  const [tonConnectUI] = useTonConnectUI()

  const currentWalletContent = useMemo(() => {
    if (currentTab.value === 'assets') {
      return <MyAssets />
    }

    return <MyTransfers />
  }, [currentTab.value])

  const handleWalletAddressClick = () => {
    if (!userWalletAddress) {
      return
    }

    clipboard(userWalletAddress, () =>
      alert('Your wallet address successfully copied!')
    )
  }

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
          <S.TotlaBalance>Total Balance</S.TotlaBalance>
          <S.Balance>${currentWalletBalance}</S.Balance>
          <S.InfoChange>
            <S.Time>24h change</S.Time>
            <S.Procent>{PROCENT_MOCK.procent}%</S.Procent>
          </S.InfoChange>
          <S.SvgRightDown>
            <SvgIconWalletTg />
          </S.SvgRightDown>
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
        <Swiper
          onSlideChange={() => {
            console.log('slider change')
          }}
          slidesPerView={2}
          spaceBetween={170}
        >
          {promoSlides.map((slide, id) => (
            <SwiperSlide>
              <Promo
                key={id}
                subtitle={slide.subtitle}
                title={slide.title}
                variant={slide.variant}
              />
            </SwiperSlide>
          ))}
        </Swiper>
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
      <MainButton
        onClick={() => tonConnectUI.openModal()}
        text="Connect wallet"
      />
    </S.Wrapper>
  )
}
