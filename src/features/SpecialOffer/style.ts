import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
`

export const Wrapper = styled.div`
  padding: 9px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(100deg, #8d84f966 -1.51%, #b7beff66 99.08%);
  border-radius: 10px;
  width: 100%;
  color: ${({ theme }) => theme.color.text};
  position: relative;
`

export const IconWrapper = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
`

export const Title = styled.p`
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 17.288px;
  color: ${({ theme }) => theme.color.text};
`

export const Description = styled.p`
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 16.3px;
  color: ${({ theme }) => theme.color.text};
`

export const Button = styled.button`
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
  color: ${({ theme }) => theme.color.hint};
  font-size: 18px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: ${({ disabled }) => (!disabled ? 'pointer' : 'not-allowed')};
`
