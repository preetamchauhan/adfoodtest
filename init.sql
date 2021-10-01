USE `adfoodio`;
CREATE TABLE IF NOT EXISTS `MasterData` (

  `id` int(11) NOT NULL auto_increment,        
  `menu` varchar(2500)  NOT NULL default '',     
   PRIMARY KEY  (`id`)
);

delete from MasterData;
insert into MasterData (menu) values ('[{"Type":"Mains","Food":[{"Name":"Avo on toast","Price":8.5},{"Name":"Pesto pasta with pine nuts and mozzarella","Price":9.5},{"Name":"Roasted pork belly with kimchi and soy sauce glaze","Price":11},{"Name":"Mac and cheese with crunchy seitan bacon (V)","Price":10}]},{"Type":"Drink","Food":[{"Name":"Gin and Tonic","Price":9.05},{"Name":"White Russian","Price":9.2},{"Name":"Mojito","Price":8},{"Name":"Old Fashioned","Price":9}]},{"Type":"Desserts","Food":[{"Name":"Apple Pie","Price":7.2},{"Name":"Pistachio Phirni","Price":7.5},{"Name":"Low Fat Tiramisu","Price":6.8}]}]');


CREATE TABLE IF NOT EXISTS `Offers` (

  `id` int(11) NOT NULL auto_increment,        
  `data` varchar(200)  NOT NULL default '',     
   PRIMARY KEY  (`id`)
);

delete from Offers;
insert into Offers (data) values ('["Hot offer! Get 10% off each main and drink combo.","Hungry Date Offer! Get 2 mains + 2 drinks + 1 dessert for 40.00."]');


CREATE TABLE IF NOT EXISTS `Orders` (

  `id` int(11) NOT NULL auto_increment,        
  `data` varchar(3500)  NOT NULL default '',    
  `name` varchar(200)  NOT NULL default '',
  `ordertime` double NULL
   PRIMARY KEY  (`id`)
);

delete from Orders;


