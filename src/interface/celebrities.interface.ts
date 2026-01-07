import { IBooking } from "./bookings.interface";

export interface ICelebritiesMetrics {
    bookings: number;
    revenue: number;
    celebrity: number;
    sessions: number;
}

export interface ILineGraphData {
    labels: string[];
    series: {
        session: number[];
        revenue: number[];
    };
}

export interface IPieChartData {
    Accepted: number;
    Pending: number;
    Rejected: number;
}

export interface ICelebrity {
    bio: string;
    created_at: string;
    email: string;
    hourly_rate: string;
    id: number;
    location: string;
    name: string;
    phone: string;
    profile_pic: string;
    profile_picture_url: string;
    email_verified_at: string;  
    bookings: IBooking[];
    suspend: number|string;
}