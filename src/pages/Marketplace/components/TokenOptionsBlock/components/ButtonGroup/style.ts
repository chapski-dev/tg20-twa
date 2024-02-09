import styled from 'styled-components';
import { Button as UIButton } from 'ui/Button/Button';

export const ButtonGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
`;
export const Button = styled(UIButton)<{ active: boolean }>`
  width: 44px;
  height: 22px;
  padding: 0;
  background-color: ${({ theme, active }) => active ? theme.color.btn : theme.color.bgSecondary};;
  color: ${({ theme, active }) => active ? theme.color.btnText : theme.color.hint};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
`;

export const Label = styled.p`
  color: ${({ theme }) => theme.color.text};
  font-size: 10px;
  font-weight: 500;
`;
