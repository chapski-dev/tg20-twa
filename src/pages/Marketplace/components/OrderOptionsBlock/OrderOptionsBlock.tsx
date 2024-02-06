import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { fromNano } from '@ton/core'
import { useQuery } from 'react-query'
import { getCurrentMaketplaceTicks, getMarketplaceTokenStats, getTokenInfo } from 'api'
import { MarketplaceTokenStats } from 'api/types'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgFilterIcon, SvgGramIcon, SvgLoop, SvgToncoinIcon } from 'ui/icons'
import { convertNumberToShortFormat } from 'utils/convertNumberToShortFormat'
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators'
import * as S from './style'
import { Select } from 'ui/Select/Select'
import { Button } from 'ui/Button/Button'
import { Accordion } from 'ui'
import { Input } from 'ui/Input/Input'
import { useDebounce } from 'hooks/useDebounce/useDebounce'
import { Switcher } from 'ui/Switcher/Switcher'

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
                <Select onChange={(event) => console.log(event.value)} options={sortOptions} />
                <S.Button onClick={onListing}>{listingText}</S.Button>
            </S.TokenSelectContentWrapper>


            <S.TokenSelectContentWrapper>
                <Select onChange={(event) => console.log(event.value)} options={sortOptions} />
                <Switcher onChange={(value) => setChecked(value as 'ton' | 'usd')} checked={checked} values={['ton', 'usd']} title='Show price in' />
            </S.TokenSelectContentWrapper>
        </S.Wrapper >
    )
}
