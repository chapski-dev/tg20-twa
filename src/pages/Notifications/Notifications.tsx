import { FC, useState } from 'react'
import { SvgTrash } from 'ui/icons'
import { NOTIFICATIONS_ITEMS_MOCK } from './mock'
import * as S from './style'

export const Notifications: FC = () => {
  const [showBasket, setShowBasket] = useState<boolean>(false)

  const handleClick = () => {
    setShowBasket((prev) => !prev)
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
            <S.Delete onClick={handleClick}>X</S.Delete>
            {showBasket ? (
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
