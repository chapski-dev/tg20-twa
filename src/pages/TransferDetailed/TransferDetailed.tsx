import { FC, useCallback, useMemo } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getTransfersHistory } from 'api'
import { TransferHistoryType } from 'api/types'
import { BackButton } from 'features/BackButton'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgSettings } from 'ui/icons'
import { shortenAddress } from 'utils/shortenAddress'
import * as S from './style'

const GRAM_PRICE = 0.000004

export const TransferDetailed: FC = () => {
  const { tonPrice } = useTelegram()

  const { hash } = useParams()

  const userWalletAddress = useTonAddress()

  const navigate = useNavigate()

  const { data: currentTransfer } = useQuery(
    ['my-transfers', hash],
    () => getTransfersHistory(userWalletAddress),
    {
      enabled: !!userWalletAddress,
      select: useCallback(
        (data: TransferHistoryType[]): TransferHistoryType | null => {
          const currentTransfer = data.find(
            (transfer) => transfer.hash === atob(hash as string)
          )

          return currentTransfer || null
        },
        [hash]
      ),
    }
  )

  const isIncrease = useMemo(() => {
    if (!currentTransfer) {
      return false
    }

    return currentTransfer.delta > 0
  }, [currentTransfer])

  return (
    <S.Wrapper>
      <BackButton onClick={() => navigate(-1)} />
      <S.Settings>
        <SvgSettings />
      </S.Settings>
      <S.MoneyInfo>
        <S.Title isIncease={isIncrease}>
          {isIncrease && '+'}
          {currentTransfer &&
            `${currentTransfer.delta} ${currentTransfer.tick.toUpperCase()}`}
        </S.Title>
        {currentTransfer && currentTransfer.tick === 'gram' && (
          <S.HintMoney>
            ~ $
            {(tonPrice &&
              (currentTransfer.delta * GRAM_PRICE).toString().slice(1)) ||
              '-.--'}
          </S.HintMoney>
        )}
      </S.MoneyInfo>
      <S.TransferWrapper>
        <S.TransferInfo>
          <S.HintText>Date</S.HintText>
          <S.Text>
            {currentTransfer
              ? dayjs(currentTransfer.time * 1000).format(
                  'DD-MMM-YYYY HH:mm:ss'
                )
              : '-.--'}
          </S.Text>
        </S.TransferInfo>
        <S.TransferInfo>
          <S.HintText>Status</S.HintText>
          <S.Text>Completed</S.Text>
        </S.TransferInfo>
        <S.TransferInfo>
          <S.HintText>Sender</S.HintText>
          <S.Text>
            {currentTransfer && shortenAddress(currentTransfer.address)}
          </S.Text>
        </S.TransferInfo>
      </S.TransferWrapper>
      <S.Network>
        <S.HintText>Network fee</S.HintText>
        <S.Text>{tonPrice && `0.008 TON ($${tonPrice * 0.008})`}</S.Text>
      </S.Network>
      <S.View>
        <S.BlueText>View on block explorer</S.BlueText>
      </S.View>
    </S.Wrapper>
  )
}
