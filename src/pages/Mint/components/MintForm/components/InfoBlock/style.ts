import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`

export const Title = styled.h5`
  color: ${({ theme }) => theme.color.text};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
  padding: 0;
`

export const DescriptionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
`

export const Description = styled.p<{ $isBold?: boolean }>`
  margin: 0;
  padding: 0;
  font-size: 12px;
  font-style: normal;
  font-weight: ${({ $isBold }) => ($isBold ? 700 : 400)};
  line-height: normal;
  letter-spacing: 0.24px;
  text-align: center;
  color: ${({ theme }) => theme.color.hint};
`
