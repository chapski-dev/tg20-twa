import { FC, useEffect, useState } from 'react'
import * as React from 'react'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { Button } from 'ui'
import { Loader } from 'ui/Loader/Loader'
import * as S from './style'

export const Splash: FC = () => {
  const { webApp } = useTelegram()
  const [firstSignIn, setFirstSignIn] = useState(true)

  useEffect(() => {
    // webApp?.CloudStorage?.getItem('first_sign_in', (err, res) => {
    //   if (res === 'false') {
    //     setTimeout(() => {
    //       setFirstSignIn(false);
    //     }, 1500);
    //   };
    // });
    setTimeout(() => {
      setFirstSignIn(false)
    }, 1500)
  }, [webApp?.CloudStorage])

  const goToApp = () => {
    webApp?.CloudStorage?.setItem('first_sign_in', 'false')
    setFirstSignIn(false)
  }

  return (
    <S.LoaderWrapper className={!firstSignIn ? 'faid' : ''}>
      <Loader />
      {/* <S.Logo children="TG20" />
      <S.Info>
        <div>
          <S.Title children="Explore new world of TG20 Tokens!" />
          <S.Description children="You’re just one step away" />
        </div>
        <Button children="Get Started" onClick={goToApp} />
      </S.Info> */}
    </S.LoaderWrapper>
  )
}
