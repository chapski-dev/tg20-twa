import styled from 'styled-components'
import { SvgArrow, SvgDeployIcon } from 'ui/icons'
import { Input } from 'ui/Input/Input'
import { Loader as UILoader } from 'ui/Loader/Loader'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 23px;
  padding: 0px 10px;
`

export const ExploreBlock = styled.div`
  display: flex;
  gap: 8px;

  flex-direction: column;
  border-bottom: 1px solid #f5f5f5;

  padding-bottom: 10px;
`

export const Title = styled.h2`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 120% */
  letter-spacing: -0.6px;
  color: ${({ theme }) => theme.color.text};
`

export const InputWrapper = styled.div`
  width: 100%;
`

export const Description = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.42px;
  color: ${({ theme }) => theme.color.hint};
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
  background-color: ${({ theme }) => theme.color.btn};
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
