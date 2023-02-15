const config = {
  baseUrl:'https://api.react-learning.ru',
  headers: {
    'content-type': 'application/json',
    Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmOTk5MmFlNWM0MGMxMGMxMWRmZTQiLCJpYXQiOjE2NDcyODY2ODEsImV4cCI6MTY3ODgyMjY4MX0.WHKXAErKZtY445yXecOFZsx981MuXicJti-okSY-tac',
   
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
getProductList() {
  return fetch(`${this._baseUrl}/products`,{
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
changeLikeProductStatus(productId,like) {
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
createNewProduct() {
  return fetch(${this._baseUrl}/products,{
    headers: this._headers,
    method: 'POST',
    body: 	{
      "name": "Букет из роз 125879",
      "price": 1000,
      "discount": 15,
      "wight": "10-15шт.",
      "description": "Пышный красивый букет из красных роз, который поднимет настроение любой женщине. Оформляем букет на заказ.",
      "isFavorite": true,
      "isCart": false,
      "available": true,
      "stock": 10,
      "picture": "src\Card\image\1_1595590590.png"
    },
  }).then(onResponse); 
}
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

