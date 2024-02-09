import styled from 'styled-components'
import { SvgCopy } from 'ui/icons'
import { Loader as UILoader } from 'ui/Loader/Loader'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 30px;
  flex-direction: column;
  align-self: center;
`

export const TopBlockWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 12px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const WalletAddressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`

export const CopyIcon = styled(SvgCopy)`
  width: 16px;
  height: 16px;

  path {
    fill: ${({ theme }) => theme.color.link};
  }
`

export const Label = styled.span`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: ${({ theme }) => theme.color.text};
  text-align: center;
  max-width: 238px;
  word-break: break-all;
`

export const WalletLabel = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 590;
  color: ${({ theme }) => theme.color.link};
  text-align: center;
  max-width: 238px;
  word-break: break-all;
`

export const AddressesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const AddressBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  &:last-child {
    align-items: flex-end;
  }
`

export const AddressLabel = styled.span<{ $isBold?: boolean }>`
  font-size: 14px;
  font-style: normal;
  font-weight: ${({ $isBold }) => ($isBold ? 590 : 400)};
  line-height: 20px;
  color: ${({ $isBold, theme }) =>
    $isBold ? theme.color.text : theme.color.text};
`

export const InscriptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.bg};
  width: 100%;
  border-radius: 10px;
`

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.bg};
`

export const Loader = styled(UILoader)`
  width: 100%;
  height: 60vh;
`

export const DontHaveInscriptionsBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 10px;
  padding: 24px 12px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: ${({ theme }) => theme.color.hint};
  background-color: ${({ theme }) => theme.color.bg};
`
