import styled from 'styled-components'
import { Tabs } from 'ui'

export const Home = styled.div`
  margin-bottom: 13px;
  .tabs {
    padding: 16px 0px;
  }

  .special-offer-container {
    padding: 16px;
  }
`

export const TabsWrapper = styled(Tabs)`
  svg {
    font-weight: 200;
  }
`

export const SpecialOfferBlock = styled.div`
  /* padding-top: 8px; */
  padding-bottom: 30px;
`

export const BannerImage = styled.img`
  width: 100%;
`
