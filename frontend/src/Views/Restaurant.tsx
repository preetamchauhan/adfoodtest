import React from "react";
import { useRestaurant } from "../hooks/RestaurantContext";
import useFetch from "../hooks/UseFetch";
import { IFood, IMenu, IOrder, IOrderDetails, menuUrl } from "../Models/RestaurantTypes";
import Cart from "./Cart";
import Menu from "./Menu";
import Offers from "./Offers";

function Restaurant(){
  const {dispatch, state} = useRestaurant();
  const {data, error, loading} = useFetch(menuUrl);
  if(loading){
    return <div className="d-flex justify-content-center">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
}
if(error){
    return <div>an error occured</div>
}

//   if(state && state.OrderDetail && state.OrderDetail.length > 0){
//   data.forEach((x:IMenu)=>{
//     x.Food.forEach((y:IFood)=>{
//       const found = state!.OrderDetail.find(a=>a.Type === x.Type && a.Food === y.Name);
//       const quantity = found ?
//       state!.OrderDetail.find(a=>a.Type === x.Type && a.Food === y.Name)!.Quantity: 0;
//       y.Quantity = quantity;
//     })
//   });
// }
  
  return (
    <>
    <Offers/>
    <div className="row">
    <div className="col-12 col-md-8">
    <Menu data={data}/>
    </div>
    <div className="col-12 col-md-4">
    <Cart/>
    </div>
    </div>
    </>
  )
}

export default Restaurant;