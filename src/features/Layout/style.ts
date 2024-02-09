import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 68px;
`

export const ContentWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.color.bg};
  display: flex;
  flex-direction: column;
`
