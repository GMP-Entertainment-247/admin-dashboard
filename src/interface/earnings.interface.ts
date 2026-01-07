export interface IEarningsMetrics {
    earnings: number;
    revenue: number;
    transactions: number;
    offers: number;
}

export interface ILineGraphData {
    labels: string[];
    series: {
        earning: number[];
        revenue: number[];
    };
}

export interface IPieChartData {
    Accepted: number;
    Pending: number;
    Rejected: number;
}