import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from './api';

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
    const { title, price, thumbnail } = productInfo;
    return (
      <div>
        <p>oi</p>
        <img src={ thumbnail } alt={ title } />
        <p data-testid="product-detail-name">{title}</p>
        <p>{price}</p>
      </div>
    );
  }
}

ProductPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductPage;
