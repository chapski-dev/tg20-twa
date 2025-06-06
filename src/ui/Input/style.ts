import styled, { DefaultTheme } from 'styled-components';

const getLabelColor = (theme: DefaultTheme, error?: boolean) => {
  switch (true) {
    case error:
      return theme.color.redAlert;
    default:
      return theme.color.text;
  }
};

const getSubLabelColor = (theme: DefaultTheme, error?: boolean) => {
  switch (true) {
    case error:
      return theme.color.redAlert;
    default:
      return theme.color.hint;
  }
};

export const Input = styled.input<{ disabled?: boolean }>`
  color: ${({ theme }) => theme.color.text};
  font-weight: 500;
  font-size: 15px;
  line-height: 14px;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  width: 100%;
  outline: none;
  border: none;
  padding: 12px 0;
  border-radius: 6px;
  height: 40px;

  &::placeholder {
    color: ${({ theme }) => theme.color.hint};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
    -webkit-transition-deмlay: 9999s;
    -webkit-text-fill-color: ${({ theme }) => theme.color.hint};
  }
`;

export const InputContainer = styled.div<{
  error?: boolean;
  focused?: boolean;
}>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  border: ${({ error, theme, focused }) =>
    error ? `1px solid ${theme.color.redAlert}` : 'none'};
  padding: 0 18px;
  gap: 8px;
  border-radius: 6px;
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 7px;
  flex-direction: column;
`;

export const Sublabel = styled.span<{ error?: boolean }>`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  color: ${({ theme, error }) => getSubLabelColor(theme, error)};
`;

export const Label = styled.span<{ error?: boolean }>`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  color: ${({ theme, error }) => getLabelColor(theme, error)};
`;

export const ErrorMessageBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.color.redAlert};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  margin-top: 4px;
`;
