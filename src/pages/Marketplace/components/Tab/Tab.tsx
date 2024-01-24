import { FC } from 'react'
import * as S from './style'

export type TabProps = {
  isActive: boolean
  onClick: () => void
  name: string
}

export const Tab: FC<TabProps> = ({ isActive, onClick, name }) => {
  return (
    <S.Tab active={isActive.toString()} onClick={onClick}>
      {name}
    </S.Tab>
  )
}
