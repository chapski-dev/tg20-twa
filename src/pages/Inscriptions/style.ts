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
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 120% */
  letter-spacing: -0.6px;
  color: ${({ theme }) => theme.color.text};
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
  gap: 12px;
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
  padding: 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.btn};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.16px;
  color: ${({ theme }) => theme.color.btnText};
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
    fill: ${({ theme }) => theme.color.btnText};
  }
`

export const SearchInput = styled(Input)`
  padding: 12px 0;
`
export const SpecialOffer = styled.div`
  padding: 9px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(100deg, #8d84f966 -1.51%, #b7beff66 99.08%);
  border-radius: 10px;
  width: 100%;
  /* overflow: hidden; */
  color: ${({ theme }) => theme.color.text};
`
export const SpecialOfferTitle = styled.p`
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 17.288px;
  color: ${({ theme }) => theme.color.text};
`

export const SpecialOfferDescription = styled.p`
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 16.3px;
  color: #474747;
  margin-bottom: 5px;
`

export const SpecialOfferButton = styled.button`
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 7px 12px;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 8.892px;
  transition: 0.3s;
  cursor: ${({ disabled }) => (!disabled ? 'pointer' : 'not-allowed')};
  opacity: ${({ disabled }) => disabled && 0.5};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  border: 1px solid ${({ theme }) => theme.color.bgSecondary};
`
