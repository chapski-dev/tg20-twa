import { useState } from 'react'

import { SvgLoop, SvgNotification, SvgTg20 } from 'ui/icons'

import { Input } from 'ui/Input/Input'
import * as S from './style'

export const Header = () => {
  const [value, setValue] = useState('')
  return (
    <S.Flex>
      <SvgTg20 className="tg-20" />
      <Input
        className="search"
        icon={<SvgLoop />}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search tokens"
        value={value}
      />
      <S.Notifications value={1}>
        <SvgNotification />
      </S.Notifications>
    </S.Flex>
  )
}
