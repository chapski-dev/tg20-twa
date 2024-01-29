import { SvgNotification, SvgTg20 } from 'ui/icons';

import * as S from './style';

export const Header = () => {
    return (
        <S.Flex>
            <SvgTg20 />
            <S.Search placeholder='Search tokens' />
            <S.Notifications value={1}>
                <SvgNotification/>
            </S.Notifications>
        </S.Flex>    
    )
}