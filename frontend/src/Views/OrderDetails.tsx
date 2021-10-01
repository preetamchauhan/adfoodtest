import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRestaurant } from '../hooks/RestaurantContext';
import useFetchOrder from '../hooks/useFetchOrder';
import { appliedOffer } from '../Models/RestaurantHelper';
import { orderDetailUrl } from '../Models/RestaurantTypes';
import OrderStatus from './OrderStatus';
function OrderDetails(){
    const {state, dispatch} = useRestaurant();
    const {id} = useParams<{id?: string}>();
    const {data, error, loading} = useFetchOrder(`${orderDetailUrl}/${id}`, state);
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

    const total = data.OrderDetail.length != 0 ? data.OrderDetail.map(x=>x.Price).reduce((a,b)=>{
        return(a!==undefined ? a : 0) + (b!==undefined ? b : 0)}) : 0;
        const $appliedOffer = appliedOffer(data);
    return <div>
    <div className="my-3 py-3">
   <div>
   <h1>Hello {data.Name}, your order submitted sucessfully, will let you know once your food is ready.</h1>
    <table className="table mt-5">
 <thead>
   <tr>
     <th scope="col">#</th>
     <th scope="col">Type</th>
     <th scope="col">Food</th>
     <th scope="col">Quantity</th>
     <th scope="col">Price</th>
   </tr>
 </thead>
 <tbody>
   {data.OrderDetail.map((data, index)=> <tr key={index}>
     <th scope="row">{index + 1}</th>
     <td>{data.Type}</td>
     <td>{data.Food}</td>
     <td>{data.Quantity}</td>
     <td>{data.Price.toFixed(2)}$</td>
   </tr>)}
   <tr>
     <th scope="row"></th>
     <td></td>
     <td></td>
     <td className="font-weight-bold">Total</td>
     <td>{total.toFixed(2)}$</td>
   </tr>
   <tr>
     <th scope="row"></th>
     <td></td>
     <td></td>
     <td className="font-weight-bold">Discounted Price</td>
     <td>{$appliedOffer!.PriceAfterDiscount.toFixed(2)}$</td>
   </tr>
   <tr>
     <th scope="row"></th>
     <td></td>
     <td></td>
     <td className="font-weight-bold">Offer applied</td>
     <td>{$appliedOffer!.appliedOffer}</td>
   </tr>
   <tr>
     <th scope="row"></th>
     <td></td>
     <td></td>
     <td className="font-weight-bold">Total Bill</td>
     <td>{$appliedOffer!.PriceAfterDiscount!==0 ? 
     $appliedOffer!.PriceAfterDiscount.toFixed(2)
       : total.toFixed(2)}$</td>
   </tr>
 </tbody>
</table>
</div>
</div>
<OrderStatus OrderId={id}/>
</div>
}

export default OrderDetails;