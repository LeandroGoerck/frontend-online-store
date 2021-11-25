import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartProduct extends Component {
  render() {
    const { item, decreaseQuantity, increaseQuantity } = this.props;
    return (
      <div className="cart-product">
        <img src={ item.thumbnail } alt={ item.title } />
        <p>{`R$${item.price.toFixed(2)}`}</p>
        <p data-testid="shopping-cart-product-name">{item.title}</p>
        <p data-testid="shopping-cart-product-quantity">{item.quantity}</p>

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
    );
  }
}

CartProduct.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  increaseQuantity: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
};

export default CartProduct;
