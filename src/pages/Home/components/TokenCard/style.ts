import styled from 'styled-components'
import { SvgArrow, SvgGramIcon } from 'ui/icons'

export const Wrapper = styled.div`
  display: flex;
  max-height: 76px;
  height: 76px;
  cursor: pointer;
`

export const ContentWrapper = styled.div`
  padding: 12px 0 12px 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px 0 0 10px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  gap: 12px;
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

export const TokenImage = styled(SvgGramIcon)`
  border-radius: 50%;
  max-width: 50px;
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
`

export const InfoValuesWrapper = styled(InfoLabelsWrapper)`
  align-items: flex-end;
`

export const Title = styled.h4`
  font-size: 17px;
  font-style: normal;
  font-weight: 590;
  line-height: 22px;
  letter-spacing: -0.43px;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.text};
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 12px;
    height: 12px;
  }
`

export const MintButton = styled.div`
  min-height: 100%;
  border-radius: 0 10px 10px 0;
  display: flex;
  padding: 0 12px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const ArrowIcon = styled(SvgArrow)`
  transform: rotate(270deg);

  max-width: 12px;

  path {
    fill: ${({ theme }) => theme.color.btn};
  }
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
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${({ theme }) => theme.color.hint};
`

export const InfoValue = styled(Label)`
  color: ${({ theme }) => theme.color.text};
  margin-left: 4px;
`
