import styled from 'styled-components'
import { Tabs as UITabs } from 'ui'
import { Loader as UILoader } from 'ui/Loader/Loader'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background: ${({ theme }) => theme.color.bgSecondary};
  color: ${({ theme }) => theme.color.bg};
  padding: 24px 0;
  flex: 1;
`

export const Label = styled.span`
  font-size: 20px;
  font-style: normal;
  font-weight: 510;
  line-height: 24px;
  letter-spacing: -0.264px;
  color: ${({ theme }) => theme.color.hint};
`

export const TopBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
`

export const Title = styled.h2`
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.264px;
  color: ${({ theme }) => theme.color.text};
  max-width: 300px;
  margin: 0;
  padding: 0;
  text-align: center;
`

export const Loader = styled(UILoader)`
  width: 100%;
  height: 50vh;
`

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
  padding: 0 16px;
`

export const TabContentWrapper = styled.div`
  width: 100%;
`

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
`

export const Checkbox = styled.input`
  cursor: pointer;
`

export const CheckboxLabel = styled.label`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: ${({ theme }) => theme.color.text};
`

export const Tabs = styled(UITabs)<{ $isActive?: boolean }>`
  border-bottom: ${({ $isActive, theme }) =>
    `2px solid ${$isActive ? theme.color.link : 'transparent'}`};
`
