import { FC } from 'react'
import * as S from './style'

type RepeatBlockProps = {
  label: string
  count: number
  onChange: (count: number) => void
}

const countItems = [1, 8, 16, 24]

export const RepeatBlock: FC<RepeatBlockProps> = (props) => {
  const { label, count, onChange } = props

  return (
    <S.Wrapper>
      <S.Label children={label} />
      <S.CountItemsWrapper>
        {countItems.map((countItem) => (
          <S.CountItem
            children={countItem}
            key={countItem}
            $isActive={countItem === count}
            onClick={() => onChange(countItem)}
          />
        ))}
      </S.CountItemsWrapper>
    </S.Wrapper>
  )
}
