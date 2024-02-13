import { FC, useState } from 'react'
import { SvgTrash } from 'ui/icons'
import { NOTIFICATIONS_ITEMS_MOCK } from './mock'
import * as S from './style'

export const Notifications: FC = () => {
  const [showBasket, setShowBasket] = useState<{ [key: number]: boolean }>({})

  const handleClick = (idx: number) => {
    setShowBasket((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }))
  }

  return (
    <S.Wrapper>
      <S.TitleBlock>
        <S.Title>
          Notifications<S.Count>1</S.Count>
        </S.Title>
        <S.TextRight>Mark all as read</S.TextRight>
      </S.TitleBlock>
      <S.ItemsList>
        {NOTIFICATIONS_ITEMS_MOCK.map(({ icon, title, time, message }, idx) => (
          <S.Item key={idx}>
            <S.SvgIcon>{icon}</S.SvgIcon>
            <S.InfoBlock>
              <S.TitleInfo>{title}</S.TitleInfo>
              <S.Message>{message}</S.Message>
              <S.Time>{time} mins ago</S.Time>
            </S.InfoBlock>
            <S.Delete onClick={() => handleClick(idx)}>X</S.Delete>
            {showBasket[idx] ? (
              <S.DeleteCart>
                <SvgTrash />
              </S.DeleteCart>
            ) : null}
          </S.Item>
        ))}
      </S.ItemsList>
    </S.Wrapper>
  )
}
