import React, { useState } from 'react';
import { addSyntheticTrailingComment } from 'typescript';
import { IMenu, IFood } from '../Models/RestaurantTypes';
import SubMenu from './SubMenu';

function Menu(props: any) {
  const data = props.data as IMenu[];
  return (         
      <>
      {data.map((menu:IMenu)=>
        <div key={menu.Type}>
        <SubMenu
        menu={menu}
        />
        </div>
      )}
      </>
  );
}

export default Menu;