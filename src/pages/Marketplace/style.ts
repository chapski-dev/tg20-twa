import styled from 'styled-components'
import { Loader as UILoader } from 'ui/Loader/Loader'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 18px 0;
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

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  gap: 10px;
`

export const TabsWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.color.bg};
`

export const TabContentWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 15px;
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
