import styled from 'styled-components'
import bgImg from './assets/splash.png'
import { SvgLogo } from './assets/SvgLogo'

export const Logo = styled(SvgLogo)`
  position: absolute;
  top: 33px;
  left: 23px;
  font-size: 40px;
  font-weight: 900;
`
export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 17px 20px;
  justify-content: flex-end;
  background: linear-gradient(#ffffff00, ${({ theme }) => theme.color.bg}),
    url(${bgImg});
  background-color: ${({ theme }) => theme.color.bg};
  background-position: center;
  background-size: cover;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;

  &.faid {
    opacity: 0%;
    visibility: hidden;
    transition: opacity 0.7s, visibility 0.7s;
  }
`

export const LoaderWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.color.bg};
  background-position: center;
  background-size: cover;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;

  &.faid {
    opacity: 0%;
    visibility: hidden;
    transition: opacity 0.7s, visibility 0.7s;
  }
`

export const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  opacity: 0%;
  transition: opacity 1s;

  @keyframes fadeInUp {
    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeInUp {
    to {
      opacity: 1;
    }
  }

  animation-duration: 1s;
  animation-delay: 3s;
  animation-fill-mode: both;
  -webkit-animation-duration: 1s;
  -webkit-animation-delay: 3s;
  -webkit-animation-fill-mode: both;

  opacity: 0;
  animation-name: fadeInUp;
  -webkit-animation-name: fadeInUp;

  button {
    width: 100%;
  }
`

export const Title = styled.h1`
  font-size: 27px;
  font-style: normal;
  font-weight: 700;
  line-height: 33px;
`

export const Description = styled.span`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 33px;
`
