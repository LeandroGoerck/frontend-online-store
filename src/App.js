import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Search from './services/Search';
import './App.css';
import ShoppingCart from './services/ShoppingCart';
import ProductPage from './services/ProductPage';
import { getProductById } from './services/api';

class App extends React.Component {

  constructor() {
    super();
    this.state = { cart: [] };
    this.addCartItem = this.addCartItem.bind(this);
  }

  componentDidMount() {
    localStorage.setItem('cart', '[]');
  }

  addCartItem({ target }) {
    const { value } = target;
    const { cart } = this.state;
    getProductById(value)
      .then((productObj) => {
        const exists = cart.find((item) => (item.id === value));
        if (exists) {
          cart.find((item) => (item.id === value)).quantity += 1;
          this.setState({ cart });
          console.log('incrementa');
        } else {
          console.log('adiciona objeto inteiro');
          productObj.quantity = 1;
          this.setState({ cart: [...cart, productObj] });
        }
      });
  }

  render() {
    const { cart } = this.state;
    const { addCartItem } = this;
    return (
      <BrowserRouter>
        <Switch>

          <Route
            exact
            path="/"
            render={ (props) => (
              <Search
                { ...props }
                cart={ cart }
                addCartItem={ addCartItem }
              />
            ) }
          />
          {' '}
          ;

          <Route
            exact
            path="/shoppingcart"
            render={ (props) => (
              <ShoppingCart
                { ...props }
                cart={ cart }
                addCartItem={ addCartItem }
              />
            ) }
          />
          {' '}
          ;

          <Route
            exact
            path="/product/:id"
            render={ (props) => (
              <ProductPage
                { ...props }
                cart={ cart }
                addCartItem={ addCartItem }
              />
            ) }
          />
          {' '}
          ;

        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
