export async function getCategories() {
  return fetch('https://api.mercadolibre.com/sites/MLB/categories')
    .then((data) => data.json())
    .catch((error) => error);
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`)
    .then((data) => data.json())
    .catch((error) => error);
}

// export async function getProductById(productId) {
//   return fetch(`https://api.mercadolibre.com/items/${productId}`)
//     .then((data) => (data.json()
//       .then((obj) => (
//         { id: obj.id,
//           title: obj.title,
//           thumbnail: obj.thumbnail,
//           price: obj.price,
//         }
//       ))))
//     .catch((error) => error);
// }

export async function getProductById(productId) {
  return fetch(`https://api.mercadolibre.com/items/${productId}`)
    .then((data) => data.json())
    .catch((error) => error);
}
