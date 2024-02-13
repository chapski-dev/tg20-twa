import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TitleBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
`

export const Title = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.text};
  gap: 9px;
  font-size: 21px;
  font-weight: 600;
  line-height: 32px;
`

export const Count = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.link};
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  line-height: 13px;
`

export const TextRight = styled.span`
  font-size: 15px;
  font-weight: 500;
  line-height: 15px;
  color: ${({ theme }) => theme.color.link};
  cursor: pointer;
`

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 100px;
`

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 25px;
  position: relative;
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.color.bgSecondary};
`

export const SvgIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50.3px;
  min-height: 50.3px;
  margin: 25px 13px 25px 25px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  border-radius: 50%;
  cursor: pointer;
`

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
`

export const TitleInfo = styled.div`
  font-size: 14.67px;
  font-weight: 600;
  line-height: 18.86px;
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
`
export const Message = styled.div`
  font-size: 14.67px;
  font-weight: 400;
  line-height: 21px;
  color: ${({ theme }) => theme.color.text};
`
export const Time = styled.div`
  color: ${({ theme }) => theme.color.hint};
`

export const Line = styled.div`
  width: 100dvh;
  height: 2px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
`

export const Delete = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  font-size: 10px;
  right: 12px;
  top: 12px;
  width: 18px;
  height: 18px;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.bgSecondary};
  border-radius: 5px;
  cursor: pointer;
`

export const DeleteCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 70px;
  height: 100%;
  background-color: #ffa8a8;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
`
