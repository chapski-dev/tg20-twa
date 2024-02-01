import { useState } from 'react';
import { AppRoutes } from 'constants/app';
import { SvgArrowRight, SvgCloseCircle } from 'ui/icons';
import Coins from './assets/Coins.png';
import * as S from './style';
import type { PromoProps } from './type';


export const Promo = (props: PromoProps) => {
    const { variant, title, subtitle } = props;
    const [isVisible, setIsVisible] = useState(true);

    const handleRemoveClick = () => {
        setIsVisible(false);
    };
    if (isVisible) {
        return (
            <S.Container variant={variant}>
                <S.Img src={Coins} alt={variant} />
                <S.Wrapper>
                    <S.Title>{title}</S.Title>
                    <S.SubtitleWrapper variant={variant}>
                        <S.Subtitle to={AppRoutes.MyWallet} variant={variant}>{subtitle}</S.Subtitle>
                        <SvgArrowRight />
                    </S.SubtitleWrapper>
                </S.Wrapper>
                <SvgCloseCircle onClick={handleRemoveClick} />
            </S.Container>
        );
    }

    return null;
}