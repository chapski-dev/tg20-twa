import { FC, useCallback, useState } from 'react'
import { GlobalStyle } from 'assets/style/GlobalStyle'
import { Container } from 'ui/Container/Container'
import * as S from './style'

type TErrorInfo = {
  componentStack: string
  error: string
}

export const ErrorInfo: FC<TErrorInfo> = (props) => {
  const { error, componentStack } = props

  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const reloadPage = useCallback(() => {
    window.location.reload()
  }, [])

  const toggleDetails = useCallback(() => {
    setIsDetailsOpen((prevState) => !prevState)
  }, [setIsDetailsOpen])

  return (
    <S.Wrapper>
      <Container>
        <S.TextWrapper>
          <S.Title>'Oops' ! Error :(</S.Title>
          <S.Label>
            An unexpected error occurred while the application was running.
          </S.Label>
          <S.Label>Try</S.Label>
          <S.Button onClick={reloadPage}>Refresh</S.Button>
          <S.Label>
            the page.
            <br />
            If the error persists, please contact technical support with
            following details :
          </S.Label>
          <S.Button onClick={toggleDetails}>
            {isDetailsOpen ? 'Hide error details' : 'Show error details'}
          </S.Button>
          {isDetailsOpen && (
            <S.DetailsWrapper>
              <S.Title $isError>{error}</S.Title>
              <S.Label>{componentStack}</S.Label>
            </S.DetailsWrapper>
          )}
        </S.TextWrapper>
      </Container>
      <GlobalStyle />
    </S.Wrapper>
  )
}
