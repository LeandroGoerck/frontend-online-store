import React from 'react';
import { getProductById } from './api';

class ProductPage extends React.Component {
  constructor() {
    super();
    this.state = {
      productInfo: [],
    }

  }
  
  componentDidMount() {
    const { id } = this.props.match.params;
    getProductById(id)
      .then((item) => this
        .setState({ productInfo: item }, () => console.log(item)));
  }
  
  render() {
    const { title, price, thumbnail } = this.state.productInfo;
    return(
      <div>
        <p>oi</p>
        <img src={ thumbnail } alt={ title }></img>
        <p data-testid="product-detail-name">{title}</p>
        <p>{price}</p>
      </div>
    )
  }

}

export default ProductPage;
