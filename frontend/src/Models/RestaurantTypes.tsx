export interface IMenu{
    Type: string;
    Food: IFood[];
}

export interface IFood{
    Name: string;
    Price: number;
    Quantity?: number;
}

export interface IRestaurentState{
    data: IMenu[];
    error: unknown;
    loading:boolean;

}

export interface IOrder{
    Name: string;
    OrderDetail: IOrderDetails[];
}

export interface IOrderDetails{
    Type: string;
    Food: string;
    Quantity: number;
    Price: number;
    IndividualPrice: number;
}

export interface Action{
    type: string;
    data: IOrderDetails;
    name: string;
}

export interface IOrderStatus{
    OrderId?: string;
}
export const Offer: string[] = ["Hot offer! Get 10% off each main and drink combo.", 
"Hungry Date Offer! Get 2 mains + 2 drinks + 1 dessert for 40.00."];

export const menuUrl: string = "http://api.adfoodio.site:4848/api/masterdata";
export const orderDetailUrl: string = "http://api.adfoodio.site:4848/api/orderdetails";
export const orderStatus: string = "http://api.adfoodio.site:4848/api/orderstatus";
export const submitOrderUrl:string = "http://api.adfoodio.site:4848/api/submitorder";