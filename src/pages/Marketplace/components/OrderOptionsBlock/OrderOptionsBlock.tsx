import { FC } from 'react'
import { Select } from 'ui/Select/Select'
import { Switcher } from 'ui/Switcher/Switcher'
import * as S from './style'

const sortOptions = [
  {
    label: 'All Orders',
    value: 'All Orders',
  },
  {
    label: 'Open Orders',
    value: 'Open Orders',
  },
  {
    label: 'Sold Orders',
    value: 'Sold Orders',
  }
]

type OrderOptionsBlockProps = {
  onListing: () => void
  listingText: string
  checked: 'ton' | 'usd',
  setChecked: (val: 'ton' | 'usd') => void
}

export const OrderOptionsBlock: FC<OrderOptionsBlockProps> = (props) => {
  const { onListing, listingText, checked, setChecked } = props
  return (
    <S.Wrapper>
      <S.TokenSelectContentWrapper>
        <Select onChange={(event) => console.log(event.value)} options={sortOptions} value={sortOptions[0]} />
        <S.Button onClick={onListing}>{listingText}</S.Button>
      </S.TokenSelectContentWrapper>


      <S.TokenSelectContentWrapper>
        <Select onChange={(event) => console.log(event.value)} options={sortOptions} value={sortOptions[0]} />
        <Switcher checked={checked} onChange={(value) => setChecked(value as 'ton' | 'usd')} title='Show price in' values={['ton', 'usd']} />
      </S.TokenSelectContentWrapper>
    </S.Wrapper >
  )
}
