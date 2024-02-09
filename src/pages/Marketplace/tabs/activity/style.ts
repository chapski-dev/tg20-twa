import styled from 'styled-components'
import { Loader as UILoader } from 'ui/Loader/Loader'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 0;
`

export const ActivityTable = styled.div`
  width: 100%;
`

export const ActivityRow = styled.div<{ even: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ even, theme }) =>
    even ? theme.color.bg : theme.color.bgSecondary};
  padding: 0 16px;
  height: 48px;
`

export const ActivityCell = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: ${({ theme }) => theme.color.text};
  flex: 1;
  word-break: break-word;
  margin: 0 8px;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  &:last-of-type {
    flex: none;
    margin: 0px;
  }
  &:first-of-type {
    margin-left: 0px;
  }
`

export const ActivityActionButton = styled.div`
  display: flex;
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  color: ${({ theme }) => theme.color.btn};
  cursor: pointer;
`

export const ActivitiesHeader = styled.div`
  background-color: ${({ theme }) => theme.color.bg};
`

export const ActivitiesBody = styled.div``

export const ActivitiesHeaderRow = styled.div`
  background-color: ${({ theme }) => theme.color.bgSecondary};
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`

export const ActivitiesHeaderCell = styled.div`
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  color: ${({ theme }) => theme.color.hint};
  text-align: left;
  font-weight: 400;
  flex: 1;
  &:last-of-type {
    flex: none;
    width: 60px;
  }
`

export const EndLoader = styled(UILoader)`
  width: 100%;
  height: 50px;
`

export const ErrorText = styled.span`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  color: ${({ theme }) => theme.color.text};
`

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.color.bg};
  gap: 10px;
`
