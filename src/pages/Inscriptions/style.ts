import styled from 'styled-components'
import { SvgArrow, SvgDeployIcon } from 'ui/icons'
import { Input } from 'ui/Input/Input'
import { Loader as UILoader } from 'ui/Loader/Loader'
import bgExplore from './assets/bg-explore.png'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 23px;
  padding: 0px 16px;
  margin-bottom: 5px;
`

export const ExploreBlock = styled.div`
  display: flex;
  border-radius: 9.31px;
  background: url(${bgExplore});
  background-size: cover;
  width: 100%;
  position: relative;
  overflow: hidden;
`

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 112px 10px 13px;
  width: 236px;
  height: 102.5px;
`

export const Title = styled.h2`
  text-align: center;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  color: ${({ theme }) => theme.color.white};
`

export const Description = styled.p`
  text-align: start;
  white-space: pre-wrap;
  font-size: 10px;
  height: 42px;
  width: 210px;
  font-weight: 600;
  line-height: 14px;
  color: ${({ theme }) => theme.color.white};
`

export const IconsBlock = styled.div`
  position: absolute;
  right: 0px;
  bottom: -2px;
`

export const InputWrapper = styled.div`
  width: 100%;
`

export const TokenCardsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
`

export const Loader = styled(UILoader)`
  width: 100%;
  height: 50vh;
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
  color: ${({ theme }) => theme.color.btn};
`

export const DeployTokenBlock = styled.div`
  height: 50px;
  padding: 0 10px;
  border-radius: 10px;
  /* background-color: ${({ theme }) => theme.color.btn}; */
  background: url(${bgExplore});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.16px;
  color: ${({ theme }) => theme.color.btnText};
  cursor: pointer;
`

export const DeployIcon = styled(SvgDeployIcon)``

export const DeployInfoBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const ArrowIcon = styled(SvgArrow)`
  path {
    fill: ${({ theme }) => theme.color.btnText};
  }
`

export const SearchInput = styled(Input)`
  padding: 12px 0;
`

export const BannerImage = styled.img`
  width: 100%;
  cursor: pointer;
`
