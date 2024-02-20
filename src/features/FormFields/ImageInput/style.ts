import styled, { DefaultTheme } from 'styled-components'

const getLabelColor = (theme: DefaultTheme, error?: boolean) => {
  switch (true) {
    case error:
      return theme.color.redAlert
    default:
      return theme.color.text
  }
}
export const Wrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  border-radius: 6px;
  align-items: center;
  width: 100%;
  max-width: 361px;
  height: 361px;
  position: relative;

  border: 1px dashed ${({ theme }) => theme.color.hint};
  background-color: ${({ theme }) => theme.color.bgSecondary};
  #exit {
    position: absolute;
    path {
      stroke: ${({ theme }) => theme.color.hint};
    }
    right: 2px;
    top: 2px;
    cursor: pointer;
    z-index: 3;
  }
`
export const Label = styled.div<{ error?: boolean }>`
  font-weight: 400;
  font-size: 14px;
  line-height: 114%;
  letter-spacing: -0.02em;
  text-align: center;
  color: ${({ theme, error }) => getLabelColor(theme, error)};
`
export const Title = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 114%;
  color: ${({ theme }) => theme.color.text};
  letter-spacing: -0.02em;
  text-align: center;
`
export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;

  path {
    fill: ${({ theme }) => theme.color.hint};
  }
`
export const Input = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  background: transparent;
  cursor: pointer;
  border: none;
  z-index: 2;
  outline: 0;
  opacity: 0;
  user-select: none;
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 6px;
`

export const Image = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  object-position: center;
`

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.color.redAlert};
  font-weight: 500;
  font-size: 10px;
  /* line-height: 17px; */
`

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
`
