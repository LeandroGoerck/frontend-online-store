import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Search from './services/Search';
import './App.css';
import ShoppingCart from './services/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Search } />
          <Route exact path="/shoppingcart" component={ ShoppingCart } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
