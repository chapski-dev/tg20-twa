import { ChartPosition } from "../../../Chart";

export type Token = {
    logo: string;
    title: string;
    verificated: boolean;
    description: string;
    volume: string;
    lastPrice: number;
    chartPosition: ChartPosition;
    chartText: string;
}