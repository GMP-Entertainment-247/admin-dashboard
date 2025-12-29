export interface IArtist {
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
}

export interface IArtistMetrics {
    upolads: number;
    revenue: number|string;
    artist: number;
    offers: number;
}

export interface ILineGraphData {
    labels: string[];
    series: {
        bookings: number[];
        revenue: number[];
        uploads: number[];
    };
}

export interface IArtistDetails {
    id: number;
    name: string;
    email: string;
    phone: string;
    profile_picture_url: string;
    hourly_rate: string;
    location: string;
    email_verified_at: string;
    created_at: string;
    is_online: number|string;
}