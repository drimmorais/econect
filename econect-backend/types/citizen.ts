export interface ICitizen {
  id: number;
  cpf: string;
  phone: string;
  biography: string;
  exchangedEcopoints: string;
  exchangedMade: string[];
  city: string;
  uf: string;
  number: string;
  zipcode: string;
  district: string;
  street: string;
}

export interface INewCitizen {
  cpf: string;
  phone: string;
  biography?: string;
  city: string;
  uf: string;
  number: string;
  zipcode: string;
  district: string;
  street: string;
  user_id: number;
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

export interface IUpdatePasswordCitizen {
  password: string;
  new_password: string;
  confirm_password: string;
}
