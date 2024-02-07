import { FC, useMemo, useState } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { BackButton } from 'features/BackButton'
import { useClipboard } from 'hooks/useClipboard/useClipboard'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { Container } from 'ui/Container/Container'
import {
  SvgArrowRightSlide,
  SvgArrowSwap,
  SvgAssetsIcon,
  SvgIconWalletTg,
  SvgLiSearch,
  SvgLogout,
  SvgRecieveSquare,
  SvgSearch,
  SvgSendSquare,
  SvgSlideTitle,
  SvgTransfersIcon,
  SvgVectorsWallet,
} from 'ui/icons'
import { type Tab } from 'ui/TabsFilled/TabsFilled'
import { shortenAddress } from 'utils/shortenAddress'
import creditCards from './assets/credit-cards.png'
import { MyAssets, MyTransfers, BalancesBlock } from './components'
import { PROCENT_MOCK } from './mock'
import * as S from './style'

const tabs: Tab[] = [
  {
    label: 'Assets',
    value: 'assets',
    icon: <SvgAssetsIcon />,
  },
  {
    label: 'Transfers',
    value: 'transfers',
    icon: <SvgTransfersIcon />,
  },
]

export const MyWallet: FC = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0])

  const userWalletAddress = useTonAddress()

  const { currentGramBalance, currentWalletBalance, tonPrice } = useTelegram()

  const navigate = useNavigate()

  const clipboard = useClipboard()

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

  return (
    <S.Wrapper>
      <BackButton onClick={() => navigate(-1)} />
      <S.TopWrapperBlock>
        <S.TopBlock>
          <S.Search>
            <S.SearchInput
              name="search"
              placeholder="Search tokens"
              // style={{
              //   backgroundImage:
              //     "url('../../pages/MyWallet/assets/li_search.png')",
              //   backgroundPosition: 'left 5px',
              //   backgroundSize: '20px 20px',
              //   backgroundRepeat: 'no-repeat',
              //   paddingLeft: '8px',
              // }}
              type="text"
            />
          </S.Search>
          <S.LogOut
            onClick={() => alert('Do you want to get out of your wallet?')}
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
      {/* <BalancesBlock /> */}

      <S.CarouselContainer>
        <Swiper
          onSlideChange={() => {
            console.log('slider change')
          }}
          slidesPerView={2}
          spaceBetween={150}
        >
          <SwiperSlide>
            <S.SwiperCard>
              <S.SvgTitle>
                <SvgSlideTitle />
              </S.SvgTitle>
              <S.ContentCard>
                <S.TitleCard>Add Crypto from Binance or Coinbase</S.TitleCard>
                <S.TextLink
                  onClick={() => {
                    alert('Deposit now')
                  }}
                >
                  Deposit now
                  <SvgArrowRightSlide />
                </S.TextLink>
              </S.ContentCard>
              <S.Close
                onClick={() => {
                  alert('Close the card')
                }}
              >
                X
              </S.Close>
            </S.SwiperCard>
          </SwiperSlide>
          <SwiperSlide>
            <S.SwiperCardSecound>
              <S.SvgTitleSecound>
                <img alt="credit-cards-png" src={creditCards} width={90} />
              </S.SvgTitleSecound>
              <S.ContentCardSecound>
                <S.TitleCardSecound>
                  See what’s new in your wallet!
                </S.TitleCardSecound>
                <S.TextLinkSecound
                  onClick={() => {
                    alert('Explore wallet')
                  }}
                >
                  Explore wallet
                  <SvgArrowRightSlide />
                </S.TextLinkSecound>
              </S.ContentCardSecound>
              <S.Close
                onClick={() => {
                  alert('Close the card')
                }}
              >
                X
              </S.Close>
            </S.SwiperCardSecound>
          </SwiperSlide>
          <SwiperSlide>
            <S.SwiperCard>
              <S.SvgTitle>
                <SvgSlideTitle />
              </S.SvgTitle>
              <S.ContentCard>
                <S.TitleCard>Add Crypto from Binance or Coinbase</S.TitleCard>
                <S.TextLink
                  onClick={() => {
                    alert('Deposit now')
                  }}
                >
                  Deposit now
                  <SvgArrowRightSlide />
                </S.TextLink>
              </S.ContentCard>
              <S.Close
                onClick={() => {
                  alert('Close the card')
                }}
              >
                X
              </S.Close>
            </S.SwiperCard>
          </SwiperSlide>
          <SwiperSlide>
            <S.SwiperCardSecound>
              <S.SvgTitleSecound>
                <img alt="credit-cards-png" src={creditCards} width={90} />
              </S.SvgTitleSecound>
              <S.ContentCardSecound>
                <S.TitleCardSecound>
                  See what’s new in your wallet!
                </S.TitleCardSecound>
                <S.TextLinkSecound
                  onClick={() => {
                    alert('Explore wallet')
                  }}
                >
                  Explore wallet
                  <SvgArrowRightSlide />
                </S.TextLinkSecound>
              </S.ContentCardSecound>
              <S.Close
                onClick={() => {
                  alert('Close the card')
                }}
              >
                X
              </S.Close>
            </S.SwiperCardSecound>
          </SwiperSlide>
        </Swiper>
      </S.CarouselContainer>

      <Container>
        <S.TabsBlock>
          <S.CustomTab
            onChange={setCurrentTab}
            selectedTab={currentTab}
            tabs={tabs}
          ></S.CustomTab>
          {currentWalletContent}
        </S.TabsBlock>
        {/* <S.BlockWrapper>
          <BalancesBlock />
          <S.WalletAddressWrapper onClick={handleWalletAddressClick}>
            <S.WalletLabel>{shortenAddress(userWalletAddress)}</S.WalletLabel>

            <S.CopyIcon />
          </S.WalletAddressWrapper>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <S.Tabs
            onChange={setCurrentTab}
            selectedTab={currentTab}
            tabs={tabs}
          />
          {currentWalletContent}
        </S.BlockWrapper> */}
      </Container>
    </S.Wrapper>
  )
}

/* <MainButton
      onClick={() => {
        // navigate(AppRoutes.Inscribe)
        navigate({
          pathname: AppRoutes.Inscribe,
          search: createSearchParams({
            type: 'mint',
            tick: 'gram',
            from: 'token',
          }).toString(),
        })
      }}
      text="Inscribe"
      /> */
