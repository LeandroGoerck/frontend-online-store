import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends Component {
  // constructor() {
  //   super();
  //   this.state = { cart: [] };
  //   this.saveLocalToState = this.saveLocalToState.bind(this);
  // }

  // saveLocalToState(cartList) {
  //   this.setState({ cart: cartList });
  // }

  render() {
    const { cart } = this.props;
    return (
      <div>
        {cart.length > 0
          ? (cart.map((item, index) => (
            <div key={ index }>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>{`R$${item.price.toFixed(2)}`}</p>
              <p data-testid="shopping-cart-product-name">{item.title}</p>
              <strong
                data-testid="shopping-cart-product-quantity"
              >
                {item.quantity}
              </strong>
            </div>
          )))

          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cart: PropTypes.instanceOf(Array).isRequired,
};

export default ShoppingCart;
