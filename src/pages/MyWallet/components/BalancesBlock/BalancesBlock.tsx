import { FC } from 'react'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgGramIcon, SvgToncoinIcon } from 'ui/icons'
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators'
import * as S from './style'

export const BalancesBlock: FC = () => {
  const { currentGramBalance, currentWalletBalance, tonPrice } = useTelegram()

  return (
    <S.Wrapper>
      <S.BalanceBlock>
        <S.IconWrapper>
          <SvgToncoinIcon />
        </S.IconWrapper>
        <S.Title>{currentWalletBalance}</S.Title>
        <S.Description>
          $
          {currentWalletBalance &&
            tonPrice &&
            (currentWalletBalance * tonPrice).toFixed(2)}
        </S.Description>
      </S.BalanceBlock>
      <S.BalanceBlock>
        <S.IconWrapper>
          <SvgGramIcon />
        </S.IconWrapper>
        <S.Title>
          {currentGramBalance && formatNumberWithSeparators(currentGramBalance)}
        </S.Title>
        <S.Description>
          ${currentGramBalance && (currentGramBalance * 0.000004).toFixed(2)}
        </S.Description>
      </S.BalanceBlock>
    </S.Wrapper>
  )
}
