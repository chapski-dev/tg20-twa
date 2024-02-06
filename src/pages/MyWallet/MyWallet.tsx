import { FC, useMemo, useState } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import { BackButton } from 'features/BackButton'
import { MainButton } from 'features/MainButton'
import { useClipboard } from 'hooks/useClipboard/useClipboard'
import { Container } from 'ui/Container/Container'
import { SvgAssetsIcon, SvgTransfersIcon } from 'ui/icons'
import { type Tab } from 'ui/TabsFilled/TabsFilled'
import { shortenAddress } from 'utils/shortenAddress'
import { MyAssets, MyTransfers, BalancesBlock } from './components'
import { NotAuthorized } from './components/NotAuthorized/NotAuthorized'
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
  const Address = useTonAddress()

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

  if (!Address) {
    return <NotAuthorized />
  }

  return (
    <>
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
        <MainButton
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
        />
      </Container>
    </>
  )
}
