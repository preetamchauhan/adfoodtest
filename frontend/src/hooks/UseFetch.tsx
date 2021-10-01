import {useState, useEffect} from "react";
import {IFood, IMenu, IOrder} from "../Models/RestaurantTypes";
export default function useFetch(url: string) {
    const initialData = [] as IMenu[];
    const [data, setData] = useState(initialData);

    const [error, setError] = useState("" as unknown);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result) 
            const parsedData:IMenu[] = JSON.parse(result.masterdata[0].menu);

            const sessionData: IOrder = JSON.parse(sessionStorage.getItem("orderDetails") || `{}`);
              if(sessionData && sessionData.OrderDetail && sessionData.OrderDetail.length > 0){
                parsedData.forEach((x:IMenu)=>{
                x.Food.forEach((y:IFood)=>{
                  const found = sessionData!.OrderDetail.find(a=>a.Type === x.Type && a.Food === y.Name);
                  const quantity = found ?
                  sessionData!.OrderDetail.find(a=>a.Type === x.Type && a.Food === y.Name)!.Quantity: 0;
                  y.Quantity = quantity;
                })
              });
            }
            setData(parsedData);
          },
          (error) => {
            setError(error);
          }
        ).finally(()=> setLoading(false))
    }, [url])
    return {data, error, loading}
}
