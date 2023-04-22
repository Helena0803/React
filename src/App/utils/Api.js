// const config = {
//   baseUrl:'https://api.react-learning.ru',
//   headers: {
//     'content-type': 'application/json',
//     // Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U4ZWMzNDU5Yjk4YjAzOGY3N2I1MzMiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2MjA5Mjg0LCJleHAiOjE3MDc3NDUyODR9.ajfNfKbFj5QlW92hnw9YuyopigJsUnYshqya9m1ENcA',
//     // Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmOTk5MmFlNWM0MGMxMGMxMWRmZTQiLCJpYXQiOjE2NDcyODY2ODEsImV4cCI6MTY3ODgyMjY4MX0.WHKXAErKZtY445yXecOFZsx981MuXicJti-okSY-tac',
//     Authorization: localStorage.getItem("token"),
//   },
// };
const freshHeaders = () => {
  return {
    headers: {
    'content-type': 'application/json',
    Authorization:
    localStorage.getItem("token"),
},
};
};

const config = {
    baseUrl:'https://api.react-learning.ru',
    headers: {
    'content-type': 'application/json',
    Authorization:
    localStorage.getItem("token"),
    },
    freshHeaders: freshHeaders,
  };
const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject('Error');
};
class Api {
  
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
    this._freshHeaders = data.freshHeaders;
  }
getProductList(page = 1) {
  return fetch(`${this._baseUrl}/products?page=${page}`, {
     ...this._freshHeaders(),
  }).then((res) => onResponse(res));
}

getUserInfo() {
  return fetch(`${this._baseUrl}/users/me`,{
 ...this._freshHeaders(),
  }).then(onResponse);
}

updateUserInfo(body) {
  return fetch(`${this._baseUrl}/users/me`,{
 ...this._freshHeaders(),
 method:"PATCH",
 body: JSON.stringify(body),
  }).then(onResponse);
}

getUsers() {
  return fetch(`${this._baseUrl}/users`,{
 ...this._freshHeaders(),
  }).then(onResponse);
}
updateAvatar(avatar) {
  return fetch(`${this._baseUrl}/v2/group-10/users/me/avatar`, {
    ...this._freshHeaders(),
    method:"PATCH",
    body: JSON.stringify(avatar),
  }).then(onResponse);
}

searchProducts(query) {
  return fetch(`${this._baseUrl}/products/search?query=${query}`,{
    ...this._freshHeaders(),
  }).then(onResponse);
}
changeLikeProductsStatus(productId,isliked) {
  return fetch(`${this._baseUrl}/products/likes/${productId}`,{
    ...this._freshHeaders(),
    method: isliked ? 'DELETE' : 'PUT',
  }).then(onResponse); 
}

deleteLike(productId) {
  return fetch(`${this._baseUrl}/products/likes/${productId}`,{
    ...this._freshHeaders(),
    method: 'DELETE'
  }).then(onResponse); 
}
addLike(productId) {
  return fetch(`${this._baseUrl}/products/likes/${productId}`,{
    ...this._freshHeaders(),
    method: 'PUT'
  }).then(onResponse); 
}
addNewProduct(data) {
  return fetch(`${this._baseUrl}/products`,{
    ...this._freshHeaders(),
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
      ...this._freshHeaders(),
    method: 'DELETE'
  }).then(onResponse); 
}
getProductById(id) {
  return fetch(`${this._baseUrl}/products/${id}`,{
    ...this._freshHeaders(),
  }).then((res) => onResponse(res));
}

addReview(productId, body) {
  return fetch(`${this._baseUrl}/products/review/${productId}`, {
    ...this._freshHeaders(),
    method:"POST",
    body:JSON.stringify(body)
  }).then(onResponse);
}
deleteReview(productId,reviewId){
  return fetch(`${this._baseUrl}/products/review/${productId}/${reviewId}`, {
    ...this._freshHeaders(),
    method:"DELETE",
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
 export const getProductById = (id) => {
  return fetch(`${config.baseUrl}/products/${id}`,{
    headers: config.headers,
  }).then(onResponse);
 }
