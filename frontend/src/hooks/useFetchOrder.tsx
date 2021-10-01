import {useState, useEffect} from "react";
import {IMenu, IOrder} from "../Models/RestaurantTypes";
import { useRestaurant } from "./RestaurantContext";
export default function useFetchOrder(url: string, state: any) {
    const initialData: IOrder = {} as IOrder;
    const [data, setData] = useState(initialData);

    const [error, setError] = useState("" as unknown);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(state.Name !== "" && state.OrderDetail.length > 0){
        setData({...data, Name: state.Name, OrderDetail: state.OrderDetail});
        setLoading(false);
        }   
        else{
        fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result) 
            const parsedData = result;
            setData({...data, Name: parsedData.name, OrderDetail: JSON.parse(result.data)});
          },
          (error) => {
            setError(error);
          }
        ).finally(()=> setLoading(false));
        }

    }, [url])
    return {data, error, loading}
}
