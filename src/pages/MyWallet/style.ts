import styled from 'styled-components'
import { Tabs } from 'ui'
import { Input } from 'ui/Input/Input'
import Vectors from './assets/vectors.png'

export const Wrapper = styled.div`
  display: flex;
  min-width: 100%;
  flex-direction: column;
  align-self: center;
  padding: 0px;
`

export const TopWrapperBlock = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

export const TopBlock = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding-top: 16px;
  padding-bottom: 10px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  background-image: url('../../pages/MyWallet/assets/li_search.png');
  background-repeat: no-repeat;
`

export const Search = styled.form`
  display: flex;
`

export const SearchInput = styled(Input)`
  width: 310.68px;
  height: 42px;
  border: none;
  border-radius: 6px;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.bg};
  svg {
    path {
      fill: ${({ theme }) => theme.color.hint};
    }
  }
  input {
    &::placeholder {
      color: ${({ theme }) => theme.color.hint};
    }
    background-color: ${({ theme }) => theme.color.bg};

    svg {
      path {
        fill {
          color: ${({ theme }) => theme.color.hint};
        }
      }
    }
  }
`

export const LogOut = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background-color: rgba(233, 70, 70, 0.15);
  border-radius: 6px;
  cursor: pointer;
`

export const BalanceBlock = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding-top: 23.5px;
  padding-bottom: 23.4px;
  padding-left: 20px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  background-image: url(${Vectors}) no-repeat;
`
export const TotlaBalance = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: ${({ theme }) => theme.color.hint};
`

export const Balance = styled.span`
  font-size: 30px;
  line-height: 36.31px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
  padding-top: 16px;
`

export const InfoChange = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-top: 2px;
`

export const Time = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.hint};
`

export const Procent = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.greenSuccess};
`

export const SvgRightDown = styled.div`
  position: absolute;
  right: 12.32px;
  bottom: 12.32px;

  path {
    fill: ${({ theme }) => theme.color.text};
  }
`

export const WalletFunctions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.color.text};
  gap: 30px;
  font-size: 14px;
  font-weight: 500;
  padding-top: 24px;
  padding-bottom: 24px;
`

export const SendBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: pointer;
`

export const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52.66px;
  height: 52.66px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  border-radius: 50%;
  border: none;
  cursor: pointer;

  svg {
    path {
      stroke: ${({ theme }) => theme.color.text};
    }
  }
`

export const SendText = styled.span`
  font-size: 14.18px;
  font-weight: 500;
`

export const RecieveBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  cursor: pointer;
`

export const RecieveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52.66px;
  height: 52.66px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  border-radius: 50%;
  border: none;
  cursor: pointer;

  svg {
    path {
      stroke: ${({ theme }) => theme.color.text};
    }
  }
`

export const RecieveText = styled.span`
  font-size: 14.18px;
  font-weight: 500;
`

export const SwapBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  cursor: pointer;
`

export const SwapButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52.66px;
  height: 52.66px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  border-radius: 50%;
  border: none;
  cursor: pointer;

  svg {
    path {
      stroke: ${({ theme }) => theme.color.text};
    }
  }
`

export const SwapText = styled.span`
  font-size: 14.18px;
  font-weight: 500;
`

export const Line = styled.div`
  border: 3px solid ${({ theme }) => theme.color.bgSecondary};
`

export const CustomTab = styled(Tabs)``

// export const Tabs = styled(UITabs)`
//   min-width: 100%;
// `

// export const WalletAddressWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   cursor: pointer;
//   margin: 0 auto;
// `

export const WalletLabel = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  color: ${({ theme }) => theme.color.link};
  text-align: center;
  max-width: 238px;
  word-break: break-all;
`

export const TabsBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`

export const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-left: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
`

export const SwiperCard = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 16.22px;
  width: 257px;
  height: 75px;
  background-color: rgba(255, 217, 75, 0.18);
  color: ${({ theme }) => theme.color.text};
  border-radius: 6px;
  padding: 8px;
  cursor: grab;
`
