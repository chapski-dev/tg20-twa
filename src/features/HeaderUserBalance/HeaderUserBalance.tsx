import { FC } from 'react';
import { useTelegram } from 'hooks/useTelegram/useTelegram';
import { SvgLogo2, SvgToncoinIcon } from 'ui/icons';
import { convertNumberToShortFormat } from 'utils/convertNumberToShortFormat';
import * as S from './style';

type HeaderUserBalanceProps = {}

export const HeaderUserBalance: FC<HeaderUserBalanceProps> = () => {
  const { currentGramBalance, currentWalletBalance } = useTelegram()

  return (
    <S.Wrapper>
      <S.SvgWallet />
      <S.SumContainer>
        <SvgToncoinIcon />
        <S.Text children={currentWalletBalance?.toFixed(2) || '0.00'} />
      </S.SumContainer>
      <S.SumContainer>
        <SvgLogo2 />
        <S.Text children={currentGramBalance ? convertNumberToShortFormat(currentGramBalance) : '0.00'} />
      </S.SumContainer>
    </S.Wrapper>
  )
};
