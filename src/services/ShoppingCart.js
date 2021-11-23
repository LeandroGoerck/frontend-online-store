import React, { Component } from 'react';

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = { cart: [] };
    this.saveLocalToState = this.saveLocalToState.bind(this);
  }

  componentDidMount() {
    const { saveLocalToState } = this;
    const cartList = JSON.parse(localStorage.getItem('cart'));
    saveLocalToState(cartList);
  }

  saveLocalToState(cartList) {
    this.setState({ cart: cartList });
  }

  render() {
    const { cart } = this.state;
    return (
      <div>
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        {cart.map((item, index) => (
          <div key={ index }>
            <img src={ item.thumbnail } alt={ item.title } />
            <p>{`R$${item.price.toFixed(2)}`}</p>
            <p data-testid="shopping-cart-product-name">{item.title}</p>
            <strong data-testid="shopping-cart-product-quantity">{cart.length}</strong>
          </div>
        ))}
      </div>
    );
  }
}

export default ShoppingCart;
