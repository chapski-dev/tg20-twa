import styled from 'styled-components'
import { Container as Container2 } from 'ui/Container/Container'
import { DynamicTickLogo as UIDynamicTickLogo } from 'ui/DynamicTickLogo/DynamicTickLogo'
import { SvgGramIcon, SvgLink } from 'ui/icons'
import { Loader as UILoader } from 'ui/Loader/Loader'

export const Wrapper = styled.div`
  padding: 25px 0 0 0;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  width: 100%;
`

export const TokenCardHeaderList = styled.div`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.bg};
  width: 100%;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  padding: 10px 40px;
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin-bottom: 2px;
`

export const TokenCardHeaderListItem = styled.div<{
  align: 'flex-start' | 'flex-end'
}>`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align};
`

export const TokenCardHeaderListItemTitle = styled.div`
  color: ${({ theme }) => theme.color.hint};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  text-overflow: ellipsis;
  line-height: 20px;
`
export const TokenCardHeaderListItemText = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  text-overflow: ellipsis;
  line-height: 20px;
`

export const TokenCardHeader = styled.div`
  padding: 0 26px 28px 26px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const TokenCardHeaderLeftSideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const PromoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: scroll;
  padding: 30px 0 0 0;
  &::-webkit-scrollbar {
    height: 0px;
  }
`

export const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 22px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.text};
`
export const Mintable = styled.div`
  color: #ffb524;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  background: linear-gradient(
      0deg,
      rgba(255, 181, 36, 0.2) 0%,
      rgba(255, 181, 36, 0.2) 100%
    ),
    #fff;
`
export const TokenIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 78px;
  background: ${({ theme }) => theme.color.bg};
  height: 78px;
  border-radius: 6px;
`
export const NotMintable = styled.div`
  color: #62c56d;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  background: rgba(98, 197, 109, 0.5);
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

export const FieldWrapper = styled.div`
  display: flex30px
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.hint};
  max-width: 100%;
  padding-bottom: 5px;
`

export const Container = styled.div`
  background-color: ${({ theme }) => theme.color.bg};
  width: 100%;
  padding: 30px 16px 30px 16px;

  .accordion {
    margin-bottom: 30px;
  }

  .btn {
    width: 100%;
    padding: 16px 30px;
    border-radius: 6px;
  }
`

export const TableWrapper = styled.div`
  margin-top: 4px;
  background-color: ${({ theme }) => theme.color.bg};
  padding: 16px 30px;
`

export const FieldFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`
export const FieldFlexItem = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`
export const FieldFlexItemLabel = styled.p<{ $isBold?: boolean }>`
  font-size: ${({ $isBold }) => ($isBold ? '14px' : '12px')};
  font-style: normal;
  font-weight: ${({ $isBold }) => ($isBold ? 600 : 400)};
  line-height: ${({ $isBold }) => ($isBold ? '20px' : '17px')};
  color: ${({ $isBold, theme }) =>
    $isBold ? theme.color.text : theme.color.hint};
`
export const Label = styled.p<{ $isBold?: boolean }>`
  font-size: ${({ $isBold }) => ($isBold ? '14px' : '12px')};
  font-style: normal;
  text-wrap: wrap;
  width: 90%;
  word-wrap: break-word;
  font-weight: ${({ $isBold }) => ($isBold ? 600 : 400)};
  line-height: ${({ $isBold }) => ($isBold ? '20px' : '17px')};
  color: ${({ $isBold, theme }) =>
    $isBold ? theme.color.text : theme.color.hint};
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
export const TableTitle = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: ${({ theme }) => theme.color.text};
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
  max-width: 60px;
  max-height: 60px;
`
