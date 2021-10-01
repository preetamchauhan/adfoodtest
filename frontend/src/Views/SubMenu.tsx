import React, { useState } from 'react';
import { addSyntheticTrailingComment } from 'typescript';
import { useRestaurant } from '../hooks/RestaurantContext';
import { IMenu, IFood, IOrder, IOrderDetails } from '../Models/RestaurantTypes';
import {AiFillCaretDown, AiFillCaretRight} from 'react-icons/ai'

function SubMenu(props: any) {
  const {dispatch} = useRestaurant();
  const data = props.menu as IMenu;
  const [subMenu, setSubMenu] = useState(data);
  const [toggle, setToggle] = useState(false);
  function addSubMenuItems(type:string, foodName: string, price: number, action: string){
    setSubMenu((prevVal:IMenu)=>{
      const updatedSubItems = prevVal.Food.map(x=>{
          if(x.Name === foodName){
              if(action === "+")
              x.Quantity = (x.Quantity!==undefined? x.Quantity : 0) + 1;
              else
              x.Quantity = (x.Quantity!==undefined? x.Quantity : 0) - 1;
          }
          return x;
      })
      return {Type: type,Food:updatedSubItems};
    })
    const order: IOrderDetails = {Type: type, Food: foodName,Price: price,IndividualPrice: price, Quantity: (action === "+" ? 1 : -1)};
    //if(action === "+")
    dispatch({type: "Add", data: order});
    //else
    //dispatch({type: "Add", data: order});
  }
  return (         
      <>
        <div className="my-3 py-3" key={subMenu.Type}>
        <div className="row">
        <div className="col-8">
        <h1>{subMenu.Type}</h1>
        </div>
        <div className="col mt-2">
        { !toggle ? <AiFillCaretRight data-testid="subMenuId" size={30} onClick={()=> setToggle(!toggle)}/> :
         <AiFillCaretDown size={30} onClick={()=> setToggle(!toggle)}/>
        }
        </div>
        </div>
        {toggle ? subMenu.Food.map((food:IFood, index)=>
              <div key={food.Name}>
              <div className="card-deck mb-1 text-center">
                <div className="card mb-1 box-shadow">
                  <div className="card-header">
                    <h4 className="my-0 font-weight-normal">{food.Name}</h4>
                  </div>
                  <div className="card-body">
                    <h1 className="card-title pricing-card-title">{`$${food.Price}`}</h1>
                    { (food.Quantity === undefined || food.Quantity === 0) ?
                    (<button type="button" data-testid={`addBtn_${index}`} className="btn btn-sm btn-block btn-outline-primary"
                    onClick={()=>addSubMenuItems(subMenu.Type, food.Name, food.Price, "+")}>Add </button>)
                    :
                    (<div className="btn-wrapper text-center d-flex justify-content-between">
                        <button type="button" data-testid={`removeBtn_${index}`} className="btn btn-sm btn-block btn-outline-primary m-2"
                        onClick={()=>addSubMenuItems(subMenu.Type, food.Name, food.Price, "-")}
                        >
                            -
                        </button>
                        <h1 className="card-title pricing-card-title">{food.Quantity}</h1>
                        <button type="button" data-testid={`addItemBtn_${index}`} className="btn btn-sm btn-block btn-outline-primary m-2"
                        onClick={()=>addSubMenuItems(subMenu.Type, food.Name, food.Price,  "+")}
                        >
                            +
                        </button>
                    </div>)
                    }
                  </div>
                </div>
              </div>
              </div>
        ) : <></>}
        </div>
      </>
  );
}

export default SubMenu;