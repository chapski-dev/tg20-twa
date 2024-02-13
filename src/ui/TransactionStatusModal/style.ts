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
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  color: ${({ theme }) => theme.color.text};
`

export const StatusDescription = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.color.hint};
`

export const ActionLink = styled.span`
  color: ${({ theme }) => theme.color.link};
`