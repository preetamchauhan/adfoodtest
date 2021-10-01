import express, { Request, Response } from "express";
import { request } from "https";
import { conn } from "./svc/DBService";

const port = process.env.NODE_PORT || 4848;

export function run () {
  const app = express();
  const bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get("/", function(_, res) {
    res.type('text/plain').send("Food can be served");
  });
  
  app.get( '/api/masterdata',  (req: Request, res: Response) => {
    const sql='SELECT * FROM MasterData';
    conn.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.send({ title: 'Master Data', masterdata: data});
  })
  });

app.get( '/api/orderdetails/:id',  (req: Request, res: Response) => {
  const id = req.params.id;
  const sql=`SELECT * FROM Orders where id=${id}`;
  conn.query(sql, function (err, data:any, fields) {
  if (err) throw err;
  res.send(data[0]);
})
  });

  app.get( '/api/orderstatus/:id',  (req: Request, res: Response) => {
    const id = req.params.id;
    const sql=`SELECT ordertime FROM Orders where id=${id}`;
    conn.query(sql, function (err, data:any, fields) {
    if (err) throw err;
    const futureTime: number = data[0].ordertime;
    const remainingTime = futureTime - new Date().getTime();
    if(remainingTime > 0){
    setTimeout(function() {
      res.send({message: "Your food is ready for pickup"});
  }, remainingTime);
}
else if(remainingTime < 0 && remainingTime > - 120000){
    res.send({message: "Your food is ready for pickup"});
}
else{
  res.send({message: "Your order is completed, food picked up"});
}
})
});


app.post( '/api/submitorder',  (req: Request, res: Response) => {
  //console.log(req.body);
  const orderRequest = req.body;
  const name = orderRequest.Name;
  //console.log(name);
  const orderDetail = orderRequest.OrderDetail;
  //console.log(orderDetail);
  const sql=`INSERT INTO Orders (name, data,ordertime) VALUES ('${name}', 
  '${JSON.stringify(orderDetail)}', ${new Date(new Date().getTime() + 2*60000).getTime()})`;
  conn.query(sql, function (err, data: any, fields) {
  console.log(data.insertId);
  if (err) throw err;
  res.send({id: data.insertId});
})
});

  return app.listen(port, function () {
    // Port is forwarded by docker to 80.
    console.log(`Listening on http://localhost:${port}`);
  })
  
}


if(process.env.NODE_ENV !== 'testing') {
  run();
}
