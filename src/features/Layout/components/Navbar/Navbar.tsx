import { useLocation, useNavigate } from 'react-router-dom';
import { navigations } from './config';
import * as S from './style';

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <S.Container>
            {navigations.map(({ text, Logo, to }) => {
                return (
                    <S.NavItem active={location.pathname === to} onClick={() => navigate(to)}>
                        <Logo />
                        <S.Text>{text}</S.Text>
                    </S.NavItem>
                )
            })}
        </S.Container>
    )
}