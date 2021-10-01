import { stat } from 'fs';
import React, { useRef, useState } from 'react';
import { idText } from 'typescript';
import { useRestaurant } from '../hooks/RestaurantContext';
import Offers from './Offers';
import {useHistory} from 'react-router-dom';
import { appliedOffer } from '../Models/RestaurantHelper';
import { submitOrderUrl } from '../Models/RestaurantTypes';
function Order(){
    const {state, dispatch} = useRestaurant();
    const [orderBtn, setOrderBtn] = useState(false);
    const history = useHistory();
    const [$name, setName] = useState('');
    const submitOrder=()=>{
      setOrderBtn(true);
      fetch(submitOrderUrl, {
      method: "POST",
      body: JSON.stringify(state),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      })
      .then(response => {return {data: response.json(), statusCode: response.status}})
      .then(async (resp:any) => {
        console.log(await resp.data);
        const data = await resp.data;
        const statusCode = resp.statusCode;
        if(statusCode == 200){
                  history.push(`/orderdetails/${data.id}`);
                  }
      },
      (error: Error)=>{},
      ).finally(()=>{});
  }

    const total = state.OrderDetail.length != 0 ? state.OrderDetail.map(x=>x.Price).reduce((a,b)=>{
        return(a!==undefined ? a : 0) + (b!==undefined ? b : 0)}) : 0;
    
    const $appliedOffer = appliedOffer(state);
    const createOrder = ()=>{
        dispatch({type: "AddName", name: $name});
    }
 return <div>
     <Offers/>
     <div className="my-3 py-3">
     { state.Name === "" ?
     <div className="row">
     <h2>Kindly enter your name</h2>
     <div className="form-group">
      <label >Name:</label>
      <input type="text" className="form-control" value={$name} onChange={(e)=>setName(e.target.value)} placeholder="Enter name"/>
    </div>
    <div>
    <button type="button" className="btn btn-primary" onClick={createOrder}>Submit</button>
    </div>
     </div> : <></>
    }
    { state.Name !== "" ?
    <div>
    <h1>Hello {state.Name}, your order details.</h1>
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
    {state.OrderDetail.map((data, index)=> <tr key={index}>
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
<div className="row mt-3">
<div className="col">
<button className="btn btn-lg btn-block btn btn-primary float-right" onClick={submitOrder}>
  {orderBtn ? <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
  : 
  <></>}
  Create Order</button>    
</div>
</div>
</div> : <></>
}
 </div>
 </div>
}

export default Order;