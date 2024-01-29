import { SvgLoop, SvgNotification, SvgTg20 } from 'ui/icons';

import * as S from './style';
import { Input } from 'ui/Input/Input';
import { useState } from 'react';

export const Header = () => {
    const [value, setValue] = useState('');
    return (
        <S.Flex>
            <SvgTg20 className='tg-20' />
            <Input icon={<SvgLoop />} onChange={(e) => setValue(e.target.value)} value={value} placeholder='Search tokens' />
            <S.Notifications value={1}>
                <SvgNotification />
            </S.Notifications>
        </S.Flex>
    )
}