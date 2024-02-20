import styled from 'styled-components'
import gramGradient from './GramGradient.png'
import specialBg from './specialBg.png'

export const Container = styled.div`
  width: 100%;
  height: 83px;
  padding: 24px 16px;
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-image: url(${specialBg});
  background-size: cover;
  border-radius: 10px;
  position: relative;
  gap: 34px;
  padding: 12.19px 25px 11.81px 27px;
`

export const SvgWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 54px;
  width: 54px;
  height: 54px;
  min-height: 54px;
  border-radius: 50%;
  background-image: url(${gramGradient});
  background-size: cover;
`

export const ContantWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`

export const Title = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 14px;
`

export const Description = styled.p`
  font-size: 9px;
  font-weight: 500;
  line-height: 12px;
  width: 219px;
`

export const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 4px 12px;
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
  background-color: #fff;
  color: #000;
  border: 1px solid ${({ theme }) => theme.color.bgSecondary};
  width: fit-content;
`
export const Img = styled.img`
  width: 78px;
  height: 66px;
`

export const CrossBtn = styled.button`
  border: none;
  outline: none;
  background: transparent;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: ${({ disabled }) => (!disabled ? 'pointer' : 'not-allowed')};
`
