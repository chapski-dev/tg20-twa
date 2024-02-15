import { FC } from 'react'
import { SvgLoop, SvgTg20 } from 'ui/icons'
import { Input } from 'ui/Input/Input'
import * as S from './style'

type HeaderProps = {
  searchValue: string
  updateSearchValue: (value: string) => void
}

export const Header: FC<HeaderProps> = (props) => {
  const { updateSearchValue, searchValue } = props

  return (
    <S.Flex>
      <SvgTg20 className="tg-20" />
      <Input
        className="search"
        icon={<SvgLoop />}
        isSearchInput={false}
        onChange={(e) => updateSearchValue(e.target.value)}
        placeholder="Search tokens"
        value={searchValue}
        wrapperClassName="search-container"
      />
      {/* <S.Notifications
        onClick={() => navigate(AppRoutes.Notifications)}
        value={1}
      >
        <SvgNotification />
      </S.Notifications> */}
    </S.Flex>
  )
}
