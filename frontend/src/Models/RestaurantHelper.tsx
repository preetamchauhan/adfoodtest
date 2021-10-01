import { IOrder } from "./RestaurantTypes";

export const appliedOffer=(state:IOrder)=>{
    const orderDetails = state;
    let appliedOffer;
    const mains = orderDetails.OrderDetail.filter(x=>x.Type==='Mains');
    const drinks = orderDetails.OrderDetail.filter(x=>x.Type==='Drink');
    const desserts = orderDetails.OrderDetail.filter(x=>x.Type==='Desserts');
    let combo = 0;
    const mainsQuantity = mains.length > 0 ? mains.map(x=>x.Quantity).reduce((a,b)=> (a!==undefined ? a : 0) + (b!==undefined ? b : 0)) : 0;
    const drinksQuantity = drinks.length > 0  ? drinks.map(x=>x.Quantity).reduce((a,b)=> (a!==undefined ? a : 0) + (b!==undefined ? b : 0)) : 0;
    const dessertsQuantity = desserts.length > 0 ? desserts.map(x=>x.Quantity).reduce((a,b)=> (a!==undefined ? a : 0) + (b!==undefined ? b : 0)) : 0;
    
    if(mainsQuantity > 1 && drinksQuantity > 1 && dessertsQuantity > 0){
        appliedOffer = "Hungry Date Offer";
        let mainspart = Math.floor(mainsQuantity / 2);
        let drinkspart = Math.floor(drinksQuantity / 2);
        let dessertspart = dessertsQuantity;
        if(mainspart < drinkspart){
            combo = mainspart;
        }
        else if(mainspart > drinkspart){
            combo = drinkspart;
        }
        else{
            combo= drinkspart
        }
        if(combo >  dessertspart){
            combo = dessertspart;
        }

        let mainItemPriceArr: number[]= [];
        mains.forEach((x)=>{
            for(let i=1;i<=x.Quantity;i++){
                mainItemPriceArr.push(x.IndividualPrice);
           }
           });

           let drinkItemPriceArr: number[] = [];
           drinks.forEach((x)=>{
               for(let i=1;i<=x.Quantity;i++){
                drinkItemPriceArr.push(x.IndividualPrice);
              }
              });
              let dessartsItemPriceArr: number[] = [];
              drinks.forEach((x)=>{
                  for(let i=1;i<=x.Quantity;i++){
                    dessartsItemPriceArr.push(x.IndividualPrice);
                 }
                 });
        
                 mainItemPriceArr.sort((a,b)=>b-a);
                 drinkItemPriceArr.sort((a,b)=>b-a);
                 dessartsItemPriceArr.sort((a,b)=>b-a);
            let partMainItemPrice = 0;
            for(let i=0; i< mainItemPriceArr.length; i++){
                if(i>= combo*2){
                    partMainItemPrice = partMainItemPrice + mainItemPriceArr[i];
                }
            }
            let partDrinksItemPrice = 0;
            for(let i=0; i< drinkItemPriceArr.length; i++){
                if(i>= combo*2){
                    partDrinksItemPrice = partDrinksItemPrice + drinkItemPriceArr[i];
                }
            }

            let partDessrtItemPrice = 0;
            for(let i=0; i< dessartsItemPriceArr.length; i++){
                if(i>= combo){
                    partDessrtItemPrice = partDessrtItemPrice + dessartsItemPriceArr[i];
                }
            }

            const totalPriceAfterDiscount = partMainItemPrice + partDrinksItemPrice + partDessrtItemPrice + combo * 40;
            return {PriceAfterDiscount: totalPriceAfterDiscount,
                appliedOffer}; 
      
    }

    else if(mainsQuantity > 0 && drinksQuantity > 0){
        appliedOffer = "Hot offer"
        if(mainsQuantity > drinksQuantity){
            combo = drinksQuantity;
        }
        else if(mainsQuantity > drinksQuantity){
            combo = mainsQuantity;
        }
        else{
            combo = mainsQuantity;
        }

        let mainItemPriceArr: number[]= [];
        mains.forEach((x)=>{
            for(let i=1;i<=x.Quantity;i++){
                mainItemPriceArr.push(x.IndividualPrice);
           }
           });

           let drinkItemPriceArr: number[] = [];
           drinks.forEach((x)=>{
               for(let i=1;i<=x.Quantity;i++){
                drinkItemPriceArr.push(x.IndividualPrice);
              }
              });

              mainItemPriceArr.sort((a,b)=>b-a);
              drinkItemPriceArr.sort((a,b)=>b-a);
        const mainItemPriceAfterDiscount = mainItemPriceArr.reduce((a,b,index)=>{
            if(index <= combo){
                a = a - (a * 10/100);
            }
            return a+b;
        })

        const drinkItemPriceAfterDiscount = drinkItemPriceArr.reduce((a,b,index)=>{
            if(index <= combo){
                a = a - (a * 10/100);
            }
            return a+b;
        });
        return {PriceAfterDiscount: mainItemPriceAfterDiscount + drinkItemPriceAfterDiscount,
            appliedOffer};
    }
    return {PriceAfterDiscount: 0,
        appliedOffer};
};