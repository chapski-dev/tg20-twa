import Notification from 'ui/icons/Notification';
import Tg20 from 'ui/icons/Tg20';

import * as S from './style';

export const Header = () => {
    return (
        <S.Flex>
            <Tg20 />
            <S.Search placeholder='Search tokens' />
            <S.Notifications value={1}>
                <Notification/>
            </S.Notifications>
        </S.Flex>    
    )
}