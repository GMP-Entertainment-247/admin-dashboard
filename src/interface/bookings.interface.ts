export interface IBooking {
    id: number;
    title: string;
    organizer: string;
    location: string;
    type: string;
    artist_id: string;
    booker: string;
    amount: string;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
    status: string;
    is_rated: string;
    is_ended: string;
    is_paid: string;
    accepted_date: string;
    payment_date: string;
    rejected_date: string;
    reason: string;
    booked: {
        name: string;
        email: string;
        phone: string;
        profile_pic: string;
        profile_picture_url: string;
    };
    event: string;
    description: string;
    country: string;
    state: string;
    payment_url: string;
    reference: string;
    images: IBookingImage[];
}

export interface IBookingImage {
    id: number;
    image_url: string;
}

export interface IBookingMetrics {
    sessions: number;
    tickets: number;
    bookings: number;
    accepted: number;
    pending: number;
    rejected: number;
}