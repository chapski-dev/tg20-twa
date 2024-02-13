import { FC, useMemo } from 'react'
import dayjs from 'dayjs'
import { SvgGramIcon, SvgSettings, SvgToncoinIcon } from 'ui/icons'
import { shortenAddress } from 'utils/shortenAddress'
import * as S from './style'

type TransferInfoProps = {
  date: number
}

export const TransferInfo: FC<TransferInfoProps> = (props) => {
  const { date } = props

  return (
    <S.Wrapper>
      <S.Settings>
        <SvgSettings />
      </S.Settings>
      <S.MoneyInfo>
        <S.Grey>+100 000 GRAM</S.Grey>
        <S.HintMoney>~ $ 54.61</S.HintMoney>
      </S.MoneyInfo>
      <S.TransferWrapper>
        <S.TransferInfo>
          <S.HintText>Date</S.HintText>
          <S.Text>{dayjs(date * 1000).format('DD-MMM-YYYY HH:mm:ss')}</S.Text>
        </S.TransferInfo>
        <S.TransferInfo>
          <S.HintText>Status</S.HintText>
          <S.Text>Completed</S.Text>
        </S.TransferInfo>
        <S.TransferInfo>
          <S.HintText>Sender</S.HintText>
          <S.Text>0c5512catt236056</S.Text>
        </S.TransferInfo>
      </S.TransferWrapper>
      <S.Network>
        <S.HintText>Network fee</S.HintText>
        <S.Text>0.012 TON($.00036)</S.Text>
      </S.Network>
      <S.View>
        <S.BlueText>View on block explorer</S.BlueText>
      </S.View>
    </S.Wrapper>
  )
}
