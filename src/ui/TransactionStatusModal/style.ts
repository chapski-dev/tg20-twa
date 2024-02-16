import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding-bottom: 10vh;
`

export const StatusText = styled.span`
  font-size: 26px;
  font-weight: 600;
  line-height: 31px;
  letter-spacing: -0.01em;
  text-align: center;

  color: ${({ theme }) => theme.color.text};
`

export const StatusDescription = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.01em;
  text-align: center;
  color: ${({ theme }) => theme.color.hint};
  padding: 0px 22px;
`

export const ActionLink = styled.span`
  margin-top: 22px;
  color: ${({ theme }) => theme.color.link};
`
