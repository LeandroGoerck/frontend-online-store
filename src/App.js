import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Search from './services/Search';
import './App.css';
import ShoppingCart from './services/ShoppingCart';
import ProductPage from './services/ProductPage';
import { getProductById, getProductsFromCategoryAndQuery } from './services/api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      results: [],
      // categories: [],
      searchInput: '',
      category: '',
    };
    this.addCartItem = this.addCartItem.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value }, () => {
      if (name === 'category') {
        this.handleSearchButton();
      }
    });
  }

  handleSearchButton() {
    const { searchInput, category } = this.state;
    getProductsFromCategoryAndQuery(category, searchInput)
      .then((data) => {
        const productList = data.results.map((result) => ({
          title: result.title,
          id: result.id,
          thumbnail: result.thumbnail,
          price: result.price,
        }));
        this.setState({ results: productList });
      });
  }

  addCartItem({ target }) {
    const { value } = target;
    const { cart, results } = this.state;
    const productObj = results.find((result) => (result.id === value));
    const exists = cart.find((item) => (item.id === value));
    if (exists) {
      cart.find((item) => (item.id === value)).quantity += 1;
      this.setState(() => ({
        cart,
      }));
      console.log('adiciona novo');
    } else {
      productObj.quantity = 1;
      this.setState((prevState) => ({ cart: [...prevState.cart, productObj] }));
      console.log(productObj);
    }
  }

  decreaseQuantity({ target }) {
    const { value } = target;
    const { cart } = this.state;
    // const productObj = results.find((result) => (result.id === value));
    // getProductById(value)
    // .then(() => {
    const obj = cart.find((item) => (item.id === value));
    if (obj) {
      const quant = obj.quantity;
      if (quant > 1) {
        cart.find((item) => (item.id === value)).quantity -= 1;
      }
      this.setState({ cart });
    }
    // });
  }

  render() {
    const { cart,
      results,
      // categories,
      searchInput,
      category,
    } = this.state;
    const {
      addCartItem,
      decreaseQuantity,
      handleChange,
      handleSearchButton,
    } = this;
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
                handleChange={ handleChange }
                handleSearchButton={ handleSearchButton }
                results={ results }
                // categories={ categories }
                searchInput={ searchInput }
                category={ category }
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
                increaseQuantity={ addCartItem }
                decreaseQuantity={ decreaseQuantity }
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
