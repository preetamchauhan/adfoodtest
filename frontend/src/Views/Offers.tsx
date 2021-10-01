import React, { useRef, useState } from 'react';
import { Offer } from '../Models/RestaurantTypes';

function Offers(){
return <div className="row">
    {Offer.map((detail, index)=>
        <div className="d-flex justify-content-center alert alert-info mt-1" role="alert" key={index}>{detail}</div>
    )}
</div>
}

export default Offers;