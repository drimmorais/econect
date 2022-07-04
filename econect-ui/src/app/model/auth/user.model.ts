
export class User {
    id: number;
    username: string;
    email: string;
    name: string;
    password: string;
    typeuser: 'citizen' | 'collect point' | 'admin';
    // image?: File | string;
}

export interface IUpdateUser {
    email: string;
    username: string;
    name: string;
    image?: string;
}