import { ReactElement, useCallback, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { FCWithChildren } from 'types/app'
import * as S from './style'

type ModalProps = {
  className?: string
  onClose: () => void
  title: string | ReactElement
  description?: string
  image?: string
}

const PORTAL_TARGET = 'portal'

const portalElement = document.getElementById(PORTAL_TARGET) as HTMLElement

export const Modal: FCWithChildren<ModalProps> = (props) => {
  const { children, className, onClose, title, description, image } = props

  const outsideRef = useRef(null)

  const handleWrapperClick = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (evt.target === outsideRef.current) {
      onClose()
    }
  }

  const handleKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return ReactDOM.createPortal(
    <S.WrapModal ref={outsideRef} onClick={handleWrapperClick}>
      <S.CardWrapper className={className}>
        <S.Flex>
          <S.Image src={image} alt='image' />
          <S.Title children={title} />
          <S.Description children={description} />
          <S.Close onClick={onClose} />
        </S.Flex>
        {children}
      </S.CardWrapper>
    </S.WrapModal>,
    portalElement
  )
}
