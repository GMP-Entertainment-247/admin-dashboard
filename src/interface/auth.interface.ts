export interface ILogin {
    token: string;
    user: IUser;
}

export interface IUser {
    created_at: string;
    email: string;
    email_verified_at: string;
    failed_attempts: string;
    id: number;
    is_online: number;
    last_login: string;
    locked_at: string;
    name: string;
    passcode: string;
    passcode_set: string;
    phone: string;
    updated_at: string;
    user_name: string;
    user_type: string;
}