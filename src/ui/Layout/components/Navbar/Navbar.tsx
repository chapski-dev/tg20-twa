import { navigations } from './config';
import * as S from './style';

export const Navbar = () => {
  return (
    <S.Container>
      {navigations.map(({ text, Logo, to }) => {
        return (
          <S.NavItem className={({isActive}) => isActive ? 'active' : ''} to={to}>
            <Logo />
            {text}
          </S.NavItem>
        )
      })}
    </S.Container>
  )
}