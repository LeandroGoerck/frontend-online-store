import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ShoppingCart.css';

class ShoppingCart extends Component {
  render() {
    const { cart, increaseQuantity, decreaseQuantity } = this.props;
    return (
      <div className="cart-conteiner">
        {cart.length > 0
          ? (cart.map((item, index) => (
            <div key={ index } className="cart-product">
              <img src={ item.thumbnail } alt={ item.title } />
              <strong>{`R$${item.price.toFixed(2)}`}</strong>
              <strong data-testid="shopping-cart-product-name">{item.title}</strong>
              <strong
                data-testid="shopping-cart-product-quantity"
              >
                {item.quantity}
              </strong>

              <button
                className="increase-quantity-button"
                data-testid="product-increase-quantity"
                type="button"
                value={ item.id }
                onClick={ increaseQuantity }
              >
                +
              </button>

              <button
                className="decrease-quantity-button"
                data-testid="product-decrease-quantity"
                type="button"
                value={ item.id }
                onClick={ decreaseQuantity }
                disabled={ item.quantity <= 1 }
              >
                -
              </button>

            </div>
          )))

          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cart: PropTypes.instanceOf(Array).isRequired,
  increaseQuantity: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
};

export default ShoppingCart;
