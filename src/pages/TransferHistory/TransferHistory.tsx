import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from 'constants/app'
import { BackButton } from 'features/BackButton'
import * as S from './style'

export const TransferHistory: FC = () => {
  const navigate = useNavigate()

  return (
    <S.Wrapper>
      <BackButton onClick={() => navigate(AppRoutes.MyWallet)} />
      TransferHistory
    </S.Wrapper>
  )
}
