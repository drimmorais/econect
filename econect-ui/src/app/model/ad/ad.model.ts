export interface INewAd {
    status_of_sale?: string;
    completion_status?: string;
    type: string;
    closing_date: string;
    content: string;
    title: string;
    collect_point_id?: number;
    type_material_id: number;
    price: number;
    quantity: string;
}

export interface adActive {
    closing_date: Date;
    collect_point_id: number;
    completion_status: string;
    content: string;
    current_quantity: number;
    id: number;
    price: string;
    quantity: number;
    status_of_sale: false;
    title: string;
    type: string;
    type_material_id: number;
}