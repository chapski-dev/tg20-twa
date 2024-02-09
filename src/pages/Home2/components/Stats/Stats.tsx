import { stats } from './config'
import * as S from './style'
import { Chart } from '../Chart/Chart'

export const Stats = () => {
  return (
    <S.Stats>
      {stats.map((stat) => {
        return (
          <S.StatItem>
            <S.Head>
              <S.StatTitle>{stat.amount}</S.StatTitle>
              {stat.changes && (
                <Chart
                  position={stat.changes.position}
                  text={stat.changes.amount}
                />
              )}
            </S.Head>
            <S.StatText children={stat.title} />
          </S.StatItem>
        )
      })}
    </S.Stats>
  )
}
