import React from 'react';
import logo from './logo.png';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Menu from './Views/Menu';
import Cart from './Views/Cart';
import Restaurant from './Views/Restaurant';
import Order from './Views/Order';
import OrderDetails from './Views/OrderDetails';

function App() {
  const mystyle = {
    padding: "24px !important",
  };
  return (
    <Router>
    <div className="container">
    <header className="blog-header mt-1">
    <div className={`jumbotron jumbotron-fluid Jumbo`}>
  <div className="container">
    <h1 className="display-4 d-flex justify-content-center">My Restaurent</h1>
    
  </div>
</div>
        </header>
    <Switch>
    <Route path="/order">
      <Order/>
    </Route>
    <Route path="/orderdetails/:id">
      <OrderDetails/>
    </Route>
    <Route path="/">
            <Restaurant/>
    </Route>
    </Switch>
    </div>
    </Router>
  );
}

export default App;
