import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from './api';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      searchInput: '',
      results: [],
      category: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
  }

  componentDidMount() {
    getCategories()
      .then((category) => this
        .setState({ categories: category }, () => console.log(category)));
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

  render() {
    const { categories, searchInput, results } = this.state;
    const { handleChange, handleSearchButton } = this;
    return (
      <div>
        <input
          data-testid="query-input"
          type="text"
          name="searchInput"
          value={ searchInput }
          onChange={ handleChange }
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ handleSearchButton }
        >
          Pesquisar
        </button>

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
                    value={ category.id }
                    data-testid="category"
                    onClick={ handleChange }
                  />
                  { category.name }
                </label>
              </div>
            ))}
        </div>

        <div>
          { results.length > 0 && results.map((result) => (
            <div
              key={ result.id }
              data-testid="product"
            >
              <span>{result.title}</span>
              <img src={ result.thumbnail } alt={ result.title } />
              <p>{`R$${result.price.toFixed(2)}`}</p>
            </div>
          )) }
        </div>

      </div>
    );
  }
}

export default Search;
