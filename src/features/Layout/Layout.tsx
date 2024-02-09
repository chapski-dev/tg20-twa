import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Splash } from 'features/Splash'
import { SvgError, SvgSuccess } from 'ui/icons'
import { Navbar } from './components'
import * as S from './style'

export const Layout: FC = () => {
  return (
    <>
      <Splash />
      <S.Wrapper>
        <S.ContentWrapper>
          <Outlet />
        </S.ContentWrapper>
        <Navbar />
      </S.Wrapper>
      <ToastContainer
        autoClose={4000}
        closeOnClick
        hideProgressBar
        icon={({ type }) => {
          if (type === "success") return <SvgSuccess />;
          if (type === "error") return <SvgError />;
          else return null;
        }}
        newestOnTop
        pauseOnFocusLoss
        pauseOnHover
        position="top-center"
        rtl={false}
        theme='colored'
      />
    </>
  )
}
