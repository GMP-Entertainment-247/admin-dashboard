export interface IInvestorsMetrics {
    investment: number;
    revenue: number;
    investors: number;
}

export interface IInvestorsChart {
    labels: string[];
    series: {
        investment: number[];
        revenue: number[];
    };
}