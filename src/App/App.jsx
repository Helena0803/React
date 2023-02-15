import React, {useEffect, useState} from 'react';
import { Card } from '../Card/Card';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { CardFlower } from '../CardFlower/CardFlower';
import './App.css';
import data  from '../../src/data/data.json';
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {api, getProductList, getUserInfo} from './utils/Api'
import { getIssues, useDebounce } from './utils/utils';


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  const handleSearch = (search) => {
    api.searchProducts(search).then((data) => setCards([...data])); 
  };
  const debounceValueApp = useDebounce(searchQuery, 500);

  function handleProductLike(product) {
    const isLiked = product.likes.some((el) =>el === currentUser._id);
    console.log('product', product);
    isLiked ? api.deleteLike(product._id).then((newCard) =>{
      const newCards = cards.map((e) => e._id === newCard._id ? newCard : e);
      setCards([...newCards]);

  }) : api.addLike(product._id).then((newCard) => {
    const newCards = cards.map((e) => e._id === newCard._id ? newCard : e);
    setCards([...newCards]);
  });
}


useEffect(() => {
  handleSearch(debounceValueApp)
  console.log({debounceValueApp})
},[debounceValueApp]);
 
  useEffect(() => {
  //   if (!searchQuery) return setCards(cards);
  //   const newState = data.filter((e) =>
  //     e.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
    handleSearch(searchQuery);
  }, [searchQuery]);


//Рендер товаров может зависеть от прав пользователя необходимо,чтобы данные приходилиодновременно. Для этого используем Promise.all
  useEffect(() => {
    Promise.all([api.getUserInfo(),api.getProductList()]).then(([userData,productData])=> {
      setCurrentUser(userData);
      setCards(productData.products)
    });},[]);

  // useEffect(() => {
  //   api.getProductList().then((data)=>setCards(data.products));
  //   getProductList().then((data) => setCards(data.products));
  //   getUserInfo().then((data) => console.log(data));
  //   api.getUserInfo().then((data) => setCurrentUser(data));
  // },[]);



  return (
    <>
    {/*  header */}
    <Header user={currentUser} parentCounter={parentCounter} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
  
        {/*  content */}
        <main className='content container'>
    {searchQuery && (
          <p>
            {' '}
            По запросу {searchQuery} найдено {cards.length}
            {getIssues(cards.length)}
          </p>
        )}
        <div className='triggers'>
          <div className='trigger1'>
            <span>
              <p><FontAwesomeIcon icon="fa-solid fa-car-side" />Бесплатная доставка заказа от 1000 руб</p>
            </span>
          </div>
          <div className='trigger2'>
          
          <span>
          <p><FontAwesomeIcon icon="fa-solid fa-face-laugh-beam" />Особые условия от 5 000 руб</p>
          </span>
          </div>
          <div className='trigger3'>
          <span>
            <p><FontAwesomeIcon icon="fa-solid fa-money-bill-1" />Наличный и безналичный расчет</p>
          </span>
          </div>
        </div>
        </main> 
      {/* <Card />
      <div className='content__cards'></div> */}
      <CardFlower 
      currentUser={currentUser}
      handelProductLike={handleProductLike} 
      parentCounter={parentCounter} 
      setParentCounter={setParentCounter} 
      cards={cards}/>
       {/*  footer */}
    <Footer />
  </>
  );
}

export default App;

