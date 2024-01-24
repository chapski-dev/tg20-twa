import { FC, useMemo, useState } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { useNavigate } from 'react-router-dom'
import { BackButton } from 'features/BackButton'
import { useClipboard } from 'hooks/useClipboard/useClipboard'
import { Container } from 'ui/Container/Container'
import { SvgAssetsIcon, SvgTransfersIcon } from 'ui/icons'
import { Tab } from 'ui/Tabs/Tabs'
import { shortenAddress } from 'utils/shortenAddress'
import { MyAssets, MyTransfers, BalancesBlock } from './components'
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
    <Container>
      <BackButton onClick={() => navigate(-1)} />
      <S.Wrapper>
        <S.BlockWrapper>
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
        </S.BlockWrapper>
      </S.Wrapper>
      {/* <MainButton
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
      /> */}
    </Container>
  )
}
