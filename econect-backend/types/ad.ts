export interface INewAd {
  status_of_sale: string;
  completion_status: string;
  type: string;
  closing_date: string;
  content: string;
  title: string;
  isrecyclable: boolean;
  collect_point_id: number;
  type_material_id: number;
  price: number;
  quantity: string;
  minimum: number;
}

export interface IUpdateAd {
  completion_status: string;
  type: string;
  closing_date: string;
  content: string;
  title: string;
  price: number;
  quantity: string;
}

export interface ISendAd {
  ad_id: number;
  weight: string;
  point_accumulated: string;
  note: string;
  isrecyclable: boolean;
  amount: number;
  schedule_date: string;
  schedule_hours: string;
  delivery_type: string;
  minimum: number;
}
