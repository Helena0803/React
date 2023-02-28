const config = {
  baseUrl:'https://api.react-learning.ru',
  headers: {
    'content-type': 'application/json',
    Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U4ZWMzNDU5Yjk4YjAzOGY3N2I1MzMiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2MjA5Mjg0LCJleHAiOjE3MDc3NDUyODR9.ajfNfKbFj5QlW92hnw9YuyopigJsUnYshqya9m1ENcA',
    // Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmOTk5MmFlNWM0MGMxMGMxMWRmZTQiLCJpYXQiOjE2NDcyODY2ODEsImV4cCI6MTY3ODgyMjY4MX0.WHKXAErKZtY445yXecOFZsx981MuXicJti-okSY-tac',
  },
};

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject('Error')
}
class Api {
  //сразу деструктурирую
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
getProductList(page = 2) {
  return fetch(`${this._baseUrl}/products?page=${page}`, {
    headers: this._headers,
  }).then(onResponse);
}

getUserInfo() {
  return fetch(`${this._baseUrl}/users/me`,{
    headers: this._headers,
  }).then(onResponse);
}
searchProducts(query) {
  return fetch(`${this._baseUrl}/products/search?query=${query}`,{
    headers: this._headers,
  }).then(onResponse);
}
changeLikeProductsStatus(productId,like) {
  return fetch(`${this._baseUrl}/products/likes/${productId}`,{
    headers: this._headers,
    method: like ? 'PUT' : 'DELETE'
  }).then(onResponse); 
}

deleteLike(productId) {
  return fetch(`${this._baseUrl}/products/likes/${productId}`,{
    headers: this._headers,
    method: 'DELETE'
  }).then(onResponse); 
}
addLike(productId) {
  return fetch(`${this._baseUrl}/products/likes/${productId}`,{
    headers: this._headers,
    method: 'PUT'
  }).then(onResponse); 
}
addNewProduct(data) {
  return fetch(`${this._baseUrl}/products`,{
    headers: this._headers,
    method: 'POST',
    body: 	JSON.stringify(data)
      // {
      //   "name": "Букет роз Очарование сердца",
      //   "price": 1600,
      //   "discount": 0,
      //   "wight": "7 шт",
      //   "description": "Шикарный букет из роз станет прекрасной изюминкой вашего поздравления на торжество любимого человека. Бесплатная доставка до квартиры.",
      //   // "isFavorite": false,
      //   // "isCart": false,
      //   "available": true,
      //   "stock": 10,
      //   "pictures": "http://new15955757526555.myaddshop.ru/img/800x0/1068/items/kisspng-flower-bouquet-rose-wedding-cut-flowers-tillandsia-5b418fdb047989-9902541515310233230183_1617369950.png"
      // }),
  }).then(onResponse); 
}
deleteProduct(product_id) {
  return fetch(`${this._baseUrl}/products/622c77c377d63f6e70967d1d`,{
    // return fetch(`${this._baseUrl}/posts/63ed299659b98b038f77b679`, {
    headers: this._headers,
    method: 'DELETE'
  }).then(onResponse); 
}
getProductById(id) {
  return fetch(`${this._baseUrl}/products/${id}`,{
    headers: this._headers,
  }).then((res) => onResponse(res));
}
// getProductByUserId(user_id) {
//   return fetch(`${this._baseUrl}/products ${user_id}`,{
//     headers: this._headers,
//   }).then(onResponse);
// }
}
export const api = new Api(config);


//если классы тяжелы для понимания можно без создания классов export const func = () => { return fetch().then(onResponse)}
export const getProductList = () => {
  return fetch(`${config.baseUrl}/products`,{
    headers: config.headers,
  }).then(onResponse);
}
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`,{
    headers: config.headers,
  }).then(onResponse);
}
export const searchProducts = (query) => {
  return fetch(`${config.baseUrl}/products/search?query=${query}`,{
    headers: config.headers,
  }).then(onResponse);
}
 export const getProductById = (id) => {
  return fetch(`${config.baseUrl}/products/${id}`,{
    headers: config.headers,
  }).then(onResponse);
 }
