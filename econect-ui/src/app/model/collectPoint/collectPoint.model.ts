export interface ICollectPoint {
    id: number;
    cnpj: string;
    phone: string;
    biography?: string;
    fantsyName: string;
    hours_of_operation: string;
    operatingStatus: 'active' | 'inactive';
    reasonAtChange: string;
    hoursForChange: string;
    dateForChange: string;
    validationStatus: 'approved' | 'disapproved';
    city: string;
    uf: string;
    number: string;
    zipcode: string;
    district: string;
    street: string;
}
export interface INewCollectPoint {
    user_id_fk: number;
    phone: string;
    street: string;
    zipcode: string;
    number: string;
    uf: string;
    city: string;
    district: string;
    cnpj: string;
    biography?: string;
    hours_of_operation: string;
}

export interface ICollectPointInfo{
    id: number;
    social_reason: string;
    endereco: string;
    zipcode: string;
}

export interface IUpdateCollectPoint {
    entityName?: string;
    fantsyName?: string;
    phone: string;
    hours_of_operation: string;
    biography?: string;
    city: string;
    uf: string;
    number: string;
    zipcode: string;
    district: string;
    street: string;
}
