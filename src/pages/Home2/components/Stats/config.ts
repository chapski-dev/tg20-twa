import { ChartPosition } from '../Chart'

type Stats = {
  amount: string
  title: string
  changes?: {
    position: ChartPosition
    amount: string
  }
}
export const stats: Stats[] = [
  {
    amount: '$0.001',
    title: 'TG20 Price',
    changes: {
      position: 'up',
      amount: '1.5%',
    },
  },
  {
    amount: '$4M',
    title: '24h Volume',
    changes: {
      position: 'down',
      amount: '1.5%',
    },
  },
  {
    amount: '$281M',
    title: 'Total Volume',
  },
]
