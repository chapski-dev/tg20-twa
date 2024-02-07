import React, { FC } from 'react';
import { Button } from 'ui/Button/Button';
import { SvgToncoinIcon } from 'ui/icons';
import { Modal } from 'ui/Modal/Modal';
import { formaterToFixed9 } from 'utils';
import { formatNumberWithSeparators } from 'utils/formNumberWithSeparators';
import * as S from './style';

type BuyLotProps = {
  onClose: () => void;
  fromAmount: number;
  toAmount: number;
  ticker: string;
  priceTon: number;
  priceUsd: number;
  total: number;
  handleBuyConfirmation: () => Promise<void>;
};
export const BuyLotPopup: FC<BuyLotProps> = (props) => {
  const {
    onClose,
    fromAmount,
    toAmount,
    ticker,
    priceTon,
    priceUsd,
    total,
    handleBuyConfirmation,
  } = props;
  const PROTOCOL_FEE = 0.02;
  const GAS_FEE = 0.25;

  const tonPrice = priceUsd / priceTon;

  const gasFeeUsd = GAS_FEE * tonPrice;

  const fee = total * PROTOCOL_FEE;
  const feeUsd = fee * tonPrice;

  const totalWithFee = total + GAS_FEE;
  const totalWithFeeUsd = totalWithFee * tonPrice;

  return (
    <Modal onClose={onClose} title="Confirmation">
      <S.Wrapper>
        <S.FieldsWrapper>
          <S.FieldWrapper>
            <S.ValueLabel children={formaterToFixed9(fromAmount)} />
            <S.TokenWrapper>
              <SvgToncoinIcon height={24} width={23} />
              <S.TokenLabel children="TON" />
            </S.TokenWrapper>
          </S.FieldWrapper>
          <S.For children="for" />
          <S.FieldWrapper>
            <S.ValueLabel children={formatNumberWithSeparators(toAmount)} />
            <S.TokenLabel children={ticker} />
          </S.FieldWrapper>
        </S.FieldsWrapper>

        <S.PositionsContainer>
          <S.PositionWrapper>
            <S.PositionText children="Price" />
            <S.PositionValue
              children={`${formaterToFixed9(priceTon)} TON / ${formaterToFixed9(priceUsd)} USD`}
            />
          </S.PositionWrapper>

          <S.PositionWrapper>
            <S.PositionText children="Gas fee" />
            <S.PositionValue children={`${+GAS_FEE.toFixed(6)} TON / ${+gasFeeUsd.toFixed(4)} USD`} />
          </S.PositionWrapper>

          <S.PositionWrapper>
            <S.PositionText>
              Service fee <S.PositionTextLabel children="1.99%" />
            </S.PositionText>
            <S.PositionValue
              children={`${formaterToFixed9(fee)} TON / ${formaterToFixed9(feeUsd)} USD`}
            />
          </S.PositionWrapper>

          <S.PositionWrapper>
            <S.PositionText children="Total" />
            <S.PositionValue
              children={`${formaterToFixed9(totalWithFee)} TON / ${formaterToFixed9(totalWithFeeUsd)} USD`}
            />
          </S.PositionWrapper>
        </S.PositionsContainer>
        <Button children="Buy Now" onClick={handleBuyConfirmation} />
      </S.Wrapper>
    </Modal>
  );
};
