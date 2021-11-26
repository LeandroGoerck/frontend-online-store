import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ShoppingCart.css';
import CartProduct from '../components/CartProduct';

class ShoppingCart extends Component {
  render() {
    const { cart, increaseQuantity, decreaseQuantity } = this.props;
    return (
      <div className="cart-conteiner">
        {cart.length > 0
          ? (cart.map((item, index) => (
            <CartProduct
              key={ index }
              item={ item }
              increaseQuantity={ increaseQuantity }
              decreaseQuantity={ decreaseQuantity }
            />
            // <div key={ index } className="cart-product">
            //   <img src={ item.thumbnail } alt={ item.title } />
            //   <p>{`R$${item.price.toFixed(2)}`}</p>
            //   <p data-testid="shopping-cart-product-name">
            //     {' '}
            //     {item.title}
            //     {' '}
            //   </p>
            //   <p
            //     data-testid="shopping-cart-product-quantity"
            //   >
            //     {item.quantity}
            //   </p>

            //   <button
            //     className="increase-quantity-button"
            //     data-testid="product-increase-quantity"
            //     type="button"
            //     value={ item.id }
            //     onClick={ increaseQuantity }
            //   >
            //     +
            //   </button>

            //   <button
            //     className="decrease-quantity-button"
            //     data-testid="product-decrease-quantity"
            //     type="button"
            //     value={ item.id }
            //     onClick={ decreaseQuantity }
            //     disabled={ item.quantity <= 1 }
            //   >
            //     -
            //   </button>
            // </div>
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
