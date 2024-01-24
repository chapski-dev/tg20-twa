import styled from 'styled-components'
import { Spinner as UISpinner } from 'ui/Spinner/Spinner'

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Spinner = styled(UISpinner)`
  .path {
    stroke: ${({ theme }) => theme.color.btn};
  }
`
