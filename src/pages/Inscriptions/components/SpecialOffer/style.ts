import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 9px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(100deg, #8d84f966 -1.51%, #b7beff66 99.08%);
  border-radius: 10px;
  width: 100%;
  color: ${({ theme }) => theme.color.text};
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
  color: #474747;
  margin-bottom: 5px;
`

export const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 7px 12px;
  font-size: 9.632px;
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
