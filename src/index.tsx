import React from 'react'
import * as Sentry from '@sentry/react'
import { AxiosError } from 'axios'
import ReactDOM from 'react-dom/client'
import { SkeletonTheme } from 'react-loading-skeleton'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from 'assets/style/GlobalStyle'
import { theme } from 'assets/style/theme'
import { ErrorBoundaryWithRouter } from 'features/ErrorBoundary/ErrorBandary'
import { ActionsStatusProvider } from 'providers/ActionsStatusProvider'
import { TelegramProvider } from 'providers/TelegramProvider'
import { TonConnectProvider } from 'providers/TonConnectProvider'
import { App } from './App'

Sentry.init({
  dsn: 'https://950d16bffd250ba8ff5b3bd302292aa9@o4506552653971456.ingest.sentry.io/4506552656527360',
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
      onError: (err) => {
        if (err instanceof AxiosError) {
          console.log(`Ooops! ${err.name}: ${err.message}`)
        }
      },
    },
    mutations: {
      onError: (err) => {
        if (err instanceof AxiosError) {
          console.log(`Ooops! ${err.name}: ${err.message}`)
        }
      },
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ErrorBoundaryWithRouter>
            <TonConnectProvider>
              <ActionsStatusProvider>
                <TelegramProvider>
                  <GlobalStyle />
                  <SkeletonTheme
                    baseColor={theme.color.bgSecondary}
                    duration={3}
                    highlightColor={'#ffffff30'}
                  >
                    <App />
                  </SkeletonTheme>
                </TelegramProvider>
              </ActionsStatusProvider>
            </TonConnectProvider>
          </ErrorBoundaryWithRouter>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
