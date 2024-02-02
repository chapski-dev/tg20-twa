import styled from 'styled-components'
import Select from 'react-select'

// export const Select = styled.div`
//   width: 176px;

//   .select-container {
//     width: 100%;
//   }
// `

export const StyledSelect = styled(Select)`
  width: 176px;
  .select__input-container {
    color: ${({ theme }) => theme.color.text};
  }
  .select__control {
    height: 42px;
    font-weight: 400;
    font-size: 16px;
    background: ${({ theme }) => theme.color.bgSecondary};
    border-radius: 6px;
    line-height: 140%;
    letter-spacing: -0.01em;
    border-width: 0px;
    text-align: left;

    &--is-focused {
      box-shadow: none;
      outline: none;
    }
  }
  .select__control--menu-is-open {
    svg {
      rotate: 180deg;
    }
  }
  .select__indicator-separator {
    display: none;
  }
  .select__menu {
    color: ${({ theme }) => theme.color.text};
    background-color: ${({ theme }) => theme.color.bg};
  }
  .select__value-container {
    padding: 2px 0 2px 10px;
    height: 100%;
  }
  .select__single-value {
    color: ${({ theme }) => theme.color.text};
    padding: 0;
    font-weight: 400;
    text-transform: uppercase;
    margin: 0;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: -0.03em;
    text-align: left;
  }

  .select__menu-list {
    padding: 0;
  }
  .select__option {
    text-transform: uppercase;
    background-color: ${({ theme }) => theme.color.bg};
    &:first-child {
      border-radius: 5px 0px;
    }
    &:last-child {
      border-radius: 0px 5px;
    }
    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.color.bgSecondary};
    }
    &--is-selected {
      background-color: ${({ theme }) => theme.color.bgSecondary};
      color: ${({ theme }) => theme.color.hint};
    }
    &:hover {
      background: ${({ theme }) => theme.color.bgSecondary};
    }
  }
`
