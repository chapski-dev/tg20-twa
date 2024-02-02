import styled from 'styled-components'
import { SvgGramIcon, SvgLogo2, SvgVerified } from 'ui/icons'

export const Wrapper = styled.div`
  display: flex;
  max-height: 91px;
  height: 91px;
  cursor: pointer;
  flex: 1;
`

export const ContentWrapper = styled.div`
  padding: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.bg};
  background-image: url(./card-bg.svg);

  gap: 12px;
  border: 1px solid ${({ theme }) => theme.color.bgSecondary};
  border-radius: 10px;
`

export const ImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.bg};
  border-radius: 50%;
`

export const TokenImage = styled(SvgLogo2)`
  max-width: 50px;
  width: 24px;
  max-height: 24px;
  margin-right: 4px;
  padding: 0;
  margin: 0;
  margin-right: 4px;
`

export const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 6px;
`

export const FlexWrpaper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const LeftSideInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const InfoLabelsWrapper = styled(LeftSideInfoWrapper)`
  gap: 2px;
  flex: 1;
`

export const InfoValuesWrapper = styled(InfoLabelsWrapper)`
  align-items: flex-start;
`

export const Title = styled.h4`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 100% */
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.text};
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const RightInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 7px;
`

export const InfoBlockWrapper = styled(RightInfoWrapper)`
  gap: 0;
`

export const TagsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const Tag = styled.div<{ $variant?: 'button_color' | 'default' }>`
  padding: 2px 5px;
  border-radius: 5px;
  background-color: ${({ theme, $variant }) =>
    $variant === 'button_color' ? theme.color.btn : theme.color.bg};
  font-size: 11px;
  font-style: normal;
  font-weight: 590;
  line-height: normal;
  color: ${({ theme, $variant }) =>
    $variant === 'button_color' ? theme.color.btnText : theme.color.text};
`

export const InfoFieldValue = styled.div`
  display: flex;
  align-items: center;
`

export const Label = styled.span`
  white-space: nowrap;
  text-align: left;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 160% */
  color: ${({ theme }) => theme.color.hint};
`

export const InfoValue = styled(Label)`
  color: ${({ theme }) => theme.color.text};
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 133.333% */
`
export const Verified = styled(SvgVerified)`
  width: 16;
  height: 16;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
`
