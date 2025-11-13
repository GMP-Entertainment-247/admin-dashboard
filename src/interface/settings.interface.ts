export interface ITeamMember {
    id: 44,
    name: string;
    email: string;
    phone: string;
    created_at: string;
    first_name: string;
    last_name: string;
}

export interface IProfile {
    first_name: string; 
    last_name: string;
    email: string;
    phone: string;
    location: string;
    profile_pic: string;
    profile_picture_url: string;
}

export interface IRole {
    id: number;
    name: string;
    permissions: IPermissions[];
}

export interface IPermissions {
    id: number;
    name: string;
}