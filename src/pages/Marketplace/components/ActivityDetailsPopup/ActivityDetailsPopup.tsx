import React, { FC } from 'react';
import { useTelegram } from 'hooks/useTelegram/useTelegram';
import { Modal } from 'ui/Modal/Modal';
import * as S from './style';

type ActivityDetailsPopupProps = {
  onClose: () => void;
  onConfirm: () => void;
  ticker: string;
  amount: number;
  address: string;
  date: Date;
};

export const ActivityDetailsPopup: FC<ActivityDetailsPopupProps> = ({
  onClose,
  ticker,
  amount,
  address,
  date,
}) => {
  const tma = useTelegram();

  return (
    <Modal onClose={onClose} title="Transaction Detail">
      <S.Wrapper>
        <S.PositionsContainer>
          <S.PositionInfoRow>
            <S.PositionText children="Date" />
            <S.PositionValue children={`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`} />
          </S.PositionInfoRow>

          <S.PositionInfoRow>
            <S.PositionText children="Address" />
            <S.PositionValue
              children={address.slice(0, 4) + '...' + address.slice(-4)}
            />
          </S.PositionInfoRow>

          <S.PositionInfoRow>
            <S.PositionText children="Amount" />
            <S.PositionValue children={`${amount} ${ticker}`} />
          </S.PositionInfoRow>
          <S.PositionInfoRow>
            <S.PositionText children="Type" />
            <S.PositionValueLabel children="Buy" />
          </S.PositionInfoRow>

          <S.PositionInfoRow>
            <S.PositionText children="Total Price" />
            <S.PositionValue children="50 TON" />
          </S.PositionInfoRow>

        </S.PositionsContainer>

        <S.PositionsContainer>
          <S.PositionInfoRow>
            <S.PositionText children="Network fee" />
            <S.PositionValue children="0.012 TON ($0.0036)" />
          </S.PositionInfoRow>

        </S.PositionsContainer>

        <S.BlockExplorer
          onClick={() => {
            tma.webApp!.openLink(`https://tonviewer.com/${address}`);
          }}
        >
          <S.PositionValueLink
            children="View on block explorer"
          />
        </S.BlockExplorer>
      </S.Wrapper>
    </Modal>
  );
};
