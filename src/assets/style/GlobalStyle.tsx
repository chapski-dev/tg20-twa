import { createGlobalStyle } from 'styled-components'
import 'react-toastify/dist/ReactToastify.css';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;

    -ms-overflow-style: none;
    scrollbar-width: none;
    -webkit-tap-highlight-color: transparent;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.color.bg};
    
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }


  html {
    &::-webkit-scrollbar {
      display: none;
    }
  }

  body {
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .Toastify__toast {
    border-radius: 12px;
  }
  .Toastify__toast-theme--colored.Toastify__toast--success {
    border: 1px solid ${({ theme }) => theme.color.greenSuccess};
    background-color: #f6fff9;
    color: #000;
  }
  .Toastify__toast-theme--colored.Toastify__toast--error {
    border: 1px solid ${({ theme }) => theme.color.redAlert};
    background-color: #fff5f3;
    color: #000;
  }
  .Toastify__toast-icon {
    width: 24px;
    align-self: flex-start;
    margin-inline-end: 16px;
  }
  .Toastify__close-button {
    color: ${({ theme }) => theme.color.hint};
    opacity: 1;
    margin-top: 4px;
  }
  .Toastify__close-button > svg {
    width: 20px;
    height: 20px;
  }
`
