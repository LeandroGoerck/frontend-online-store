import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategories, getProductsFromCategoryAndQuery } from './api';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      searchInput: '',
      results: [],
      category: '',
      cart: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
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

  addItemToCart({ target }) {
    const { value } = target;
    const { results, cart } = this.state;
    const cartObj = results.find((result) => result.id === value);

    cartObj.quantity = 1;

    const localStorageCartList = JSON.parse(localStorage.getItem('cart'));
    const alreadyExists = localStorageCartList.find((item) => (item.id === value));
    if (alreadyExists) {
      localStorageCartList.find((item) => (item.id === value)).quantity += 1;
      localStorage.setItem('cart', JSON.stringify(localStorageCartList));
    } else {
      this.setState({ cart: [...cart, cartObj] });
      localStorage.setItem('cart', JSON.stringify([...cart, cartObj]));
    }
  }

  render() {
    const { categories, searchInput, results } = this.state;
    const { handleChange, handleSearchButton } = this;
    const { addCartItem } = this.props;

    return (
      <div className="search-page">
        <section className="search-conteiner">
          <div>
            <input
              className="search-input"
              data-testid="query-input"
              type="text"
              name="searchInput"
              value={ searchInput }
              onChange={ handleChange }
            />
            <button
              className="search-button"
              data-testid="query-button"
              type="button"
              onClick={ handleSearchButton }
            >
              Pesquisar
            </button>

            <Link
              className="cart-button"
              to="/shoppingcart"
              data-testid="shopping-cart-button"
            >
              Carrinho
            </Link>

          </div>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </section>

        <div className="content-conteiner">
          <section className="category-conteiner">
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
          </section>

          <section className="search-result-conteiner">

            { results.length > 0 && results.map((result) => (
              <div
                className="item-card"
                key={ result.id }
                data-testid="product"
              >
                <img src={ result.thumbnail } alt={ result.title } />
                <Link
                  data-testid="product-detail-link"
                  to={ `/product/${result.id}` }
                >
                  {result.title}
                </Link>

                <p>{`R$${result.price.toFixed(2)}`}</p>

                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  value={ result.id }
                  onClick={ addCartItem }
                >
                  Adicionar ao Carrinho
                </button>

              </div>
            )) }

          </section>
        </div>

      </div>
    );
  }
}

Search.propTypes = {
  addCartItem: PropTypes.func.isRequired,
  // cart: PropTypes.instanceOf(Array).isRequired,
};

export default Search;
