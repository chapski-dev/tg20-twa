import styled from 'styled-components'
import statsBg from './statsBg.png'

export const Stats = styled.div`
  background: url(${statsBg});
  padding: 20px 16px;
  display: flex;
  gap: 8px;
`

export const StatItem = styled.div`
  background: ${({ theme }) => theme.color.bg};
  border-radius: 6px;
  padding: 15px 10px 7px 7px;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 5px;
`

export const StatTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  line-height: 16px;
  display: flex;
  gap: 2px;
`

export const StatText = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: ${({ theme }) => theme.color.text};
`

export const Head = styled.div`
  display: flex;
  align-items: flex-end;
`

export const StatProcent = styled.p`
  font-size: 10px;
  font-weight: 600;
  line-height: 16px;
  color: ${({ theme }) => theme.color.greenSuccess};
  display: flex;
`
