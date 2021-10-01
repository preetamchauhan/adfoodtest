import React from 'react';
import { fireEvent, getByText, render } from '@testing-library/react';
import SubMenu from './SubMenu';
import { IMenu } from '../Models/RestaurantTypes';

test('To check list of offers',async ()=>{
    const data: IMenu = {
            Type: "Mains",
            Food: [
                {
                    "Name": "Avo on toast",
                    "Price": 8.5
                },
                {
                    "Name": "Pesto pasta with pine nuts and mozzarella",
                    "Price": 9.5
                },
                {
                    "Name": "Roasted pork belly with kimchi and soy sauce glaze",
                    "Price": 11
                },
                {
                    "Name": "Mac and cheese with crunchy seitan bacon (V)",
                    "Price": 10
                }
            ]
    }

    const { debug, getByTestId, getByText  }  = render(<SubMenu menu={data}/>);
    fireEvent.click(getByTestId(/subMenuId/));
    await getByTestId(/addBtn_1/);
    const linkElement = getByText("$9.5");
    expect(linkElement).toBeInTheDocument();
  });