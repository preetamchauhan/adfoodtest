import React from 'react';
import {useHistory} from 'react-router-dom';
import { useRestaurant } from '../hooks/RestaurantContext';
function Cart(){
  const {state} = useRestaurant();
  const history = useHistory();
    const items = state.OrderDetail.length != 0
           ? state.OrderDetail.map(x=>x.Quantity).reduce((a,b)=>{
            return (a!==undefined ? a : 0) + (b!==undefined ? b : 0)}) : 0;
    const total = state.OrderDetail.length != 0
           ? state.OrderDetail.map(x=>x.Price).reduce((a,b)=>{
            return(a!==undefined ? a : 0) + (b!==undefined ? b : 0)}) : 0;
    return (<>
    <div className="my-4 py-4">
      <div>
      <div className="card-deck mb-1 text-center">
        <div className="card mb-1 box-shadow">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">Cart</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">{`${items} Items | $${total.toFixed(2)}`}</h1>
            { items !== 0 ?
            <button type="button" onClick={()=> history.push("/order")} className="btn btn-lg btn-block btn btn-primary">Cart Details</button>
            : <></>}
            </div>
        </div>
      </div>
      </div>
    </div>
    </>);
}
export default Cart;