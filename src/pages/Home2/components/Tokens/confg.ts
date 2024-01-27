import Pepe from './assets/pepe.png';

export type Token = {
    logo: string;
    title: string;
    verificated: boolean;
    description: string;
    volume: string;
    lastPrice: number;
    chartPosition: 'down' | 'up';
    chartText: string;
}
export const tokens: Token[] = [
    {
        logo: Pepe,
        title: 'Pepe',
        verificated: true,
        description: 'PepeToken',
        volume: '$45,365.9',
        lastPrice: 0.00001,
        chartPosition: 'down',
        chartText: '2%'
    },
    {
        logo: Pepe,
        title: 'Pepe',
        verificated: true,
        description: 'PepeToken',
        volume: '$45,365.9',
        lastPrice: 0.00001,
        chartPosition: 'down',
        chartText: '2%'
    },
    {
        logo: Pepe,
        title: 'Pepe',
        verificated: false,
        description: 'PepeToken',
        volume: '$45,365.9',
        lastPrice: 0.00001,
        chartPosition: 'up',
        chartText: '0.8%'
    }
]