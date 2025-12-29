export interface IDashboardMetrics {
    new_users: number;
    artists: number;
    fans: number;
    celebrities: number;
    contestants: number;
    bookings: number;
}

export interface IActivityLog {
    user: string;
    description: string;
    created_at: string;
}

export interface ILineGraphData {
    labels: string[];
    series: {
        artist: number[];
        celebrity: number[];
        investor: number[];
        ticket: number[];
        voting: number[];
    };
}