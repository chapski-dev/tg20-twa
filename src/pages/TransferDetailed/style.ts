import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.color.bgSecondary};
  padding: 0 16px;
  flex-direction: column;
`

export const Settings = styled.div`
  display: flex;
  align-items: end;
  text-align: right;
  justify-content: right;
  padding: 15px 0px 24px 0px;
`

export const MoneyInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding-bottom: 24px;
`

export const Grey = styled.div`
  color: ${({ theme }) => theme.color.greenSuccess};
  font-size: 26px;
  font-weight: 600;
  line-height: 31px;
  letter-spacing: -0.01em;
  text-align: left;
`

export const HintText = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.01em;
  text-align: right;
  color: ${({ theme }) => theme.color.hint};
`
export const HintMoney = styled(HintText)`
  font-size: 16px;
`

export const TransferWrapper = styled.div`
  display: flex;
  background: ${({ theme }) => theme.color.bg};
  border-radius: 6px;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
`

export const TransferInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Text = styled(HintText)`
  color: ${({ theme }) => theme.color.text};
`

export const Network = styled(TransferWrapper)`
  justify-content: space-between;
  flex-direction: row;
  margin-top: 12px;
`

export const View = styled.div`
  display: flex;
  align-items: center;
  border-style: dashed;
  border-color: ${({ theme }) => theme.color.hint};
  border-width: 0.5px;
  justify-content: center;
  margin-top: 24px;
  border-radius: 6px;
`

export const BlueText = styled.div`
  color: ${({ theme }) => theme.color.link};
  font-size: 12px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: -0.01em;
  text-align: center;
  padding: 10px 0;
`
