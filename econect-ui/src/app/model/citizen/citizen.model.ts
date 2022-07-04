export interface ICitizen {
    id: number;
    cpf: string;
    phone: string;
    biography: string;
    city: string;
    uf: string;
    number: string;
    zipcode: string;
    district: string;
    street: string;
}

export interface INewCitizen {
    user_id: number;
    phone: string;
    street: string;
    zipcode: string;
    number: string;
    uf: string;
    city: string;
    district: string;
    biography?: string;
    cpf: string;
}

export interface IUpdateCitizen {
    phone?: string;
    biography?: string;
    city?: string;
    uf?: string;
    number?: string;
    zipcode?: string;
    district?: string;
    street?: string;
}
