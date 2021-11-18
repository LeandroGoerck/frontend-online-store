import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from './api';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    getCategories()
      .then((category) => this.setState({ categories: category }));
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <input type="text" />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/shoppingcart" data-testid="shopping-cart-button">Carrinho</Link>
        <div>
          {categories.length !== 0 && categories
            .map((category) => (
              <div key={ category.id }>
                <label htmlFor={ category.id }>
                  <input
                    id={ category.id }
                    type="radio"
                    name="category"
                    data-testid="category"
                  />
                  { category.name }
                </label>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Search;
