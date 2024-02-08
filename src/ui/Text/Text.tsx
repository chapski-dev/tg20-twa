import { FC } from 'react';
import * as S from './style';

type TTextProps = {
  className?: string;
  children?: React.ReactNode;
}

export const Text: FC<TTextProps> = (props) => {
  const { children, className } = props;
  return (
  <S.Text
    children={children}
    className={className}
  />
)};
