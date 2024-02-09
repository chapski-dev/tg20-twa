import { FC, useEffect } from 'react'

const WebApp = !!window ? window.Telegram?.WebApp : undefined

interface BackButtonProps {
  onClick?: VoidFunction
}

const backButton = WebApp ? WebApp.BackButton : undefined

let isButtonShown = false

export const BackButton: FC<BackButtonProps> = ({
  onClick = () => {
    if (!!window) {
      window.history.back()
    }
  },
}) => {
  useEffect(() => {
    if (backButton) {
      backButton.show()
      isButtonShown = true
      return () => {
        isButtonShown = false
        setTimeout(() => {
          if (!isButtonShown) {
            backButton.hide()
          }
        }, 10)
      }
    }
  }, [])

  useEffect(() => {
    if (WebApp && onClick) {
      WebApp.onEvent('backButtonClicked', onClick)
      return () => {
        WebApp.offEvent('backButtonClicked', onClick)
      }
    }
  }, [onClick])

  return null
}
