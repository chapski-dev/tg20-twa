import styled from 'styled-components'
import { SvgArrow, SvgDeployIcon } from 'ui/icons'
import { Input } from 'ui/Input/Input'
import { Loader as UILoader } from 'ui/Loader/Loader'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 18px 0;
`

export const ExploreBlock = styled.div`
  padding: 16px;
  display: flex;
  gap: 8px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  flex-direction: column;
`

export const Title = styled.h2`
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  letter-spacing: -0.32px;
  color: ${({ theme }) => theme.color.text};
  margin: 0;
  padding: 0;
`

export const Description = styled.p`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.14px;
  color: ${({ theme }) => theme.color.hint};
`

export const TokenCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`

export const Loader = styled(UILoader)`
  width: 100%;
  height: 50vh;
`

export const Link = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: ${({ theme }) => theme.color.link};
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: max-content;
  gap: 6px;
`

export const LinkArrow = styled(SvgArrow)`
  width: 12px;
  height: 12px;
  transform: rotate(270deg);

  path {
    fill: ${({ theme }) => theme.color.link};
  }
`

export const NotTokensBlock = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: ${({ theme }) => theme.color.hint};
`

export const DeployTokenBlock = styled.div`
  padding: 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.16px;
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
`

export const DeployIcon = styled(SvgDeployIcon)`
  padding: 5px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.bg};
`

export const DeployInfoBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const ArrowIcon = styled(SvgArrow)`
  transform: rotate(270deg);

  max-width: 12px;

  path {
    fill: ${({ theme }) => theme.color.btn};
  }
`

export const SearchInput = styled(Input)`
  padding: 12px 0;
`
