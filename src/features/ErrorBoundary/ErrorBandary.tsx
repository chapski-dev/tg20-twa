import { Component, ErrorInfo as IErrorInfo, ReactElement } from 'react'
import { withRouter } from 'libs/with-router/with-router'
import { ErrorInfo } from 'pages/ErrorInfo/ErrorInfo'

type ErrorBoundaryProps = {
  match: {
    params: { [key: string]: string }
    path: string
    url: string
  }
  location: {
    pathname: string
    search: string
    hash: string
  }
  history: {
    push: (path: string) => void
    goBack: () => void
  }
  children: ReactElement
}

type ErrorBoundaryState = {
  hasError: boolean
  error: string
  componentStack: string
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    error: '',
    componentStack: '',
    hasError: false,
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const {
      location: { pathname },
    } = this.props
    const { hasError } = this.state

    if (hasError && prevProps.location.pathname !== pathname) {
      this.clearError()
    }
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    }
  }

  componentDidCatch(error: Error, info: IErrorInfo) {
    this.setState({
      componentStack: info.componentStack!,
      error: error.toString(),
    })
  }

  clearError = () => this.setState({ hasError: false })

  render() {
    const { children } = this.props
    const { hasError, error, componentStack } = this.state

    if (hasError) {
      return <ErrorInfo componentStack={componentStack} error={error} />
    }
    return children
  }
}

export const ErrorBoundaryWithRouter = withRouter(ErrorBoundary)
