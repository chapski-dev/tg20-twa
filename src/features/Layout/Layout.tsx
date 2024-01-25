import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Navbar} from './components'
import * as S from './style'

export const Layout: FC = () => {
  return (
    <S.Wrapper>
      <Header />
      <S.ContentWrapper>
        <Outlet />
      </S.ContentWrapper>
      <Navbar/>
    </S.Wrapper>
  )
}
