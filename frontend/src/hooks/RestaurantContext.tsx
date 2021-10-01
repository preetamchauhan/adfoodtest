import React from 'react';
import { useReducer, useContext } from 'react';
import { IMenu, IRestaurentState,IOrder } from '../Models/RestaurantTypes';
import RestaurantReducer from './RestaurantReducer';
export const RestaurantContext = React.createContext({state: {} as IOrder, dispatch:{} as React.Dispatch<any>});

export function RestaurantProvider(props: any){
    const initialState: IOrder = {Name:'',OrderDetail:[]};
    const [state, dispatch] = useReducer(RestaurantReducer, initialState);
    return (<RestaurantContext.Provider value={{state, dispatch}}>{props.children}</RestaurantContext.Provider>);
}

export function useRestaurant(){
    const context = useContext(RestaurantContext);
    if(!context)
    throw "context must be initilized";
    return context;
}