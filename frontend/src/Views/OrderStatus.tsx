import React from 'react';
import useFetchOrderStatus from '../hooks/useFetchOrderStatus';
import { IOrderStatus, orderStatus } from '../Models/RestaurantTypes';
function OrderStatus(props: IOrderStatus){
const {OrderId} = props;
const {message, error, loading} = useFetchOrderStatus(`${orderStatus}/${OrderId}`);
  if(loading){
  return (<div className="row mt-3">

<div className="d-flex justify-content-center alert alert-info mt-1" role="alert">
<div className="spinner-border mr-3" role="status">
  </div> {message}</div>
  </div>)
  }
  if(error){
    return <div>An error occured</div>
}

return (<div className="row mt-3">
<div className="d-flex justify-content-center alert alert-success mt-1" role="alert">{message}</div>
</div>)
}

export default OrderStatus;