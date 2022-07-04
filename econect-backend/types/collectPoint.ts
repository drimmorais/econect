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
  entityName: string;
  fantsyName: string;
  social_reason: string;
  phone: string;
  cnpj: string;
  hours_of_operation: string;
  days_of_operation: string;
  biography?: string;
  city: string;
  uf: string;
  number: string;
  zipcode: string;
  district: string;
  street: string;
  user_id_fk: number;
  types_of_materials_accepted: string[];
  delivery_type: string[];
}

export interface IUpdateCollectPoint {
  entityName: string;
  social_reason: string;
  phone: string;
  cnpj: string;
  hours_of_operation: string;
  days_of_operation: string;
  biography?: string;
  city: string;
  uf: string;
  number: string;
  zipcode: string;
  district: string;
  street: string;
  types_of_materials_accepted: string[];
  delivery_type: string[];
}

export interface IUpdatePasswordCollectPoint {
  password: string;
  new_password: string;
  confirm_password: string;
}

export interface IUpdateStatusCollectPoint {
  new_status: string;
  comment: string;
}
