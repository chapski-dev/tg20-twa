import GreenChart from 'ui/icons/GreenChart';
import RedChart from 'ui/icons/RedChart';

import * as S from './style';


type ChartProps = {
    position: 'down' | 'up',
    text: string
}
export const Chart = ({position, text}: ChartProps) => {
    const ChartIcon = {
        down: <RedChart/>,
        up: <GreenChart/>,
    }
    return (
        <S.Container position={position}>
            {ChartIcon[position]}
            <S.Text>{text}</S.Text>
        </S.Container>    
    );
}