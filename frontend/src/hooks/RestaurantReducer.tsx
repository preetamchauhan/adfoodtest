import { IMenu, IRestaurentState, IOrder, Action } from "../Models/RestaurantTypes";

export default function RestaurantReducer(state: IOrder, action: Action): IOrder{
    const {type, data, name} = action;
    switch (type){
        case 'Add':
            if(!state.OrderDetail.some(x=>x.Food === data.Food && x.Type === data.Type)){
                state.OrderDetail.push(data);
            return {...state, OrderDetail: state.OrderDetail};
            }
            else{
                const orderDetail = state.OrderDetail.map(x=>{
                    if(x.Food === data.Food && x.Type === data.Type){
                        x.Quantity = (x.Quantity!==undefined ? x.Quantity : 0) + (data.Quantity!==undefined ? data.Quantity : 0);
                        x.Price = data.Price * (x.Quantity === undefined ? 0 : x.Quantity);
                        x.IndividualPrice = data.Price;
                    }
                    return x;
                });
                return {...state, OrderDetail: orderDetail};
            }
        case 'AddName':
            return {...state, Name: name};
        default:
            return state; 
    }
}