import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const TopBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  width: 100%;
  padding-top: 26.85px;
  padding-bottom: 21.37px;
`

export const Title = styled.span`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.6px;
  color: ${({ theme }) => theme.color.text};

  :last-child {
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    color: ${({ theme }) => theme.color.btn};
  }
`

export const MainBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14.34px 50px 26.46px 50px;
  background-color: ${({ theme }) => theme.color.bg};
`

export const Info = styled.span`
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  color: ${({ theme }) => theme.color.hint};
`

export const IconsBlock = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.bg};
  gap: 6.51px;
`

export const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const SecoundIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`
