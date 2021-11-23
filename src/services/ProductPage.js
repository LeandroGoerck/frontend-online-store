import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from './api';
import './ProductPage.css';

class ProductPage extends React.Component {
  constructor() {
    super();
    this.state = {
      productInfo: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    getProductById(id)
      .then((item) => this
        // .setState({ productInfo: item }, () => console.log(item)));
        .setState({ productInfo: item }));
  }

  render() {
    const { productInfo } = this.state;
    const { title, price, thumbnail, id } = productInfo;
    const { addCartItem } = this.props;
    return (
      <div className="detail-conteiner">
        <img src={ thumbnail } alt={ title } />
        <p data-testid="product-detail-name">{title}</p>
        <p>{price}</p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          value={ id }
          onClick={ addCartItem }
        >
          Adicionar ao Carrinho
        </button>

        <Link
          className="cart-button"
          to="/shoppingcart"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>

      </div>
    );
  }
}

ProductPage.propTypes = {
  addCartItem: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  // cart: PropTypes.instanceOf(Array).isRequired,
};

export default ProductPage;
