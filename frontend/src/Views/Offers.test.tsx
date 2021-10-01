import React from 'react';
import { render } from '@testing-library/react';
import Offers from './Offers';

test('To check list of offers',()=>{
    const {container, getByText}  = render(<Offers/>);
    const offer1 = `"Hot offer! Get 10% off each main and drink combo."`;
    const offer2 = `"Hungry Date Offer! Get 2 mains + 2 drinks + 1 dessert for 40.00."`;
    expect(container.childNodes[0].firstChild!.textContent).toMatchInlineSnapshot(offer1);
    expect(container.childNodes[0].childNodes[1]!.textContent).toMatchInlineSnapshot(offer2);
  });