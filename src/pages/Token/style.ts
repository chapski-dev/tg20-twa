import styled from 'styled-components'
import { DynamicTickLogo as UIDynamicTickLogo } from 'ui/DynamicTickLogo/DynamicTickLogo'
import { SvgGramIcon, SvgLink } from 'ui/icons'
import { Loader as UILoader } from 'ui/Loader/Loader'

export const Wrapper = styled.div`
  padding: 15px 0;
  width: 100%;
`

export const TokenCardWrapper = styled.div`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const TokenCardHeader = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TokenCardHeaderLeftSideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 17px;
  font-style: normal;
  font-weight: 590;
  line-height: 22px;
  letter-spacing: -0.43px;
  color: ${({ theme }) => theme.color.text};
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 16px;
    height: 16px;
  }
`

export const SupplyBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`

export const SupplyLabel = styled.span<{ $type?: 'value' }>`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: ${({ $type, theme }) =>
    $type === 'value' ? theme.color.text : theme.color.hint};
`

export const InfoBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 12px;
  width: 100%;
`

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0 0 10px 10px;
  gap: 4px;
  max-width: 100%;
`

export const Label = styled.p<{ $isBold?: boolean }>`
  max-width: 100%;
  font-size: 14px;
  font-style: normal;
  word-break: break-all;
  font-weight: ${({ $isBold }) => ($isBold ? 590 : 400)};
  line-height: 20px;
  color: ${({ $isBold, theme }) =>
    $isBold ? theme.color.text : theme.color.hint};
`

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.bg};
`

export const LinkFieldWrapper = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
`

export const LinkIcon = styled(SvgLink)`
  width: 28px;
  height: 28px;
`

export const Loader = styled(UILoader)`
  height: 70vh;
`

export const NotFoundBlock = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const NotFountInfoBlockWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
`

export const NotFountLabel = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 900;
  color: ${({ theme }) => theme.color.text};
`

export const TokenIcon = styled(SvgGramIcon)`
  max-width: 32px;
  max-height: 32px;
`

export const DynamicTickLogo = styled(UIDynamicTickLogo)`
  min-width: 32px;
  min-height: 32px;
  width: 32px;
  height: 32px;
  font-size: 10px;
`
