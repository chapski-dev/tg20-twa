import styled, { css } from 'styled-components'
import { ButtonVariant } from './types'

export const Wrapper = styled.button<{
  disabled?: boolean
  variant: ButtonVariant
}>`
  border: none;
  outline: none;
  border-radius: 12px;
  padding: 7px 24px;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  transition: 0.3s;
  cursor: ${({ disabled }) => (!disabled ? 'pointer' : 'not-allowed')};
  opacity: ${({ disabled }) => disabled && 0.5};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  ${({ theme, variant }) => {
    switch (variant) {
      case 'default':
        return css`
          background: ${({ theme }) => theme.color.btn};
          color: ${({ theme }) => theme.color.btnText};
        `
      case 'white':
        return css`
          background-color: ${({ theme }) => theme.color.bg};
          color: ${({ theme }) => theme.color.text};
          border: 1px solid ${({ theme }) => theme.color.bgSecondary};
          /* box-shadow: 0px 8px 40px 0px rgba(225, 230, 236, 0.6); */
        `
    }
  }}
`
