import { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import { BackButton } from 'features/BackButton'
import * as S from './style'

export const TransferHistory: FC = () => {
  const navigate = useNavigate()

  const { tick } = useParams()

  console.log(tick)

  return (
    <S.Wrapper>
      <BackButton onClick={() => navigate(AppRoutes.MyWallet)} />
      TransferHistory
    </S.Wrapper>
  )
}
