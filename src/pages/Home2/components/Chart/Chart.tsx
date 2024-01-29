import GreenChart from 'ui/icons/GreenChart';
import RedChart from 'ui/icons/RedChart';

import * as S from './style';
import { ChartPosition } from './types';


type ChartProps = {
    position: ChartPosition,
    text: string
}
const ChartIcon = {
    down: <RedChart />,
    up: <GreenChart />,
}

export const Chart = ({ position, text }: ChartProps) => {
    return (
        <S.Container position={position}>
            {ChartIcon[position]}
            <S.Text>{text}</S.Text>
        </S.Container>
    );
}