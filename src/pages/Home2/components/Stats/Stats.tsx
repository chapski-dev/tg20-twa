import { stats } from './config';
import * as S from './style';
import { Chart } from '../Chart/Chart';


export const Stats = () => {
    return (
        <S.Stats>
            {stats.map((stat) => {

                return (
                    <S.StatItem>
                        <S.Head>
                            <S.StatTitle>{stat.amount}</S.StatTitle>
                            {stat.changes && <Chart text={stat.changes.amount} position={stat.changes.position}/>}
                        </S.Head>
                        <S.StatText>{stat.title}</S.StatText>
                    </S.StatItem>    
                );
            })}
        </S.Stats>    
    );
}