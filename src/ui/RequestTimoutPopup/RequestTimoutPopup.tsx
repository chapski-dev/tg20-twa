import React, { FC } from 'react'

import { SvgTimeout } from 'ui/icons'
import { Modal } from 'ui/Modal';
import * as S from './style'

type RequestTimoutPopupProps = {
  onClose: () => void;
}


export const RequestTimoutPopup: FC<RequestTimoutPopupProps> = (props) => {
  const {
    onClose,
  } = props

  return (
    <Modal onClose={onClose}>
      <S.Wrapper>
        <SvgTimeout />
        <S.Title children="Request Timed Out!" />
        <S.Description children="Oops looks like the listing you were trying to buy is no longer available. " />
        <S.ActionLink onClick={onClose}>
          <S.ArrowRight /> Back to Marketplace
        </S.ActionLink>
      </S.Wrapper>
    </Modal>
  );
}
