import { FC, PropsWithChildren } from 'react'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      bg: string
      bgSecondary: string
      text: string
      hint: string
      link: string
      btn: string
      btnText: string
      redAlert: string
      greenSuccess: string
    }
  }
}

export type FCWithChildren<T = {}> = FC<PropsWithChildren<T>>
