import React, {useEffect, useState} from 'react';
import { Card } from '../Card/Card';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { CardFlower } from '../CardFlower/CardFlower';
import './App.css';
import data  from '../../src/data/data.json';


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [parentCounter, setParentCounter] = useState(0);

  useEffect(() => {
    const newState = data.filter((e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCards(() => [...newState]);
  }, [searchQuery]);

  const getIssues = (numb) => {
    const tmp = numb % 10;
    if (tmp === 1) return ' товар';
    if (tmp > 1 && tmp < 5) return ' товара';
    if (tmp > 4 || !numb) return ' товаров';
  };
  return (
    <>
    {/*  header */}
    <Header parentCounter={parentCounter} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
  
        {/*  content */}
        <main className='content container'>
    {searchQuery && (
          <p>
            {' '}
            По запросу {searchQuery} найдено {cards.length}
            {getIssues(cards.length)}
          </p>
        )}
        </main> 
      {/* <Card />
      // <div className='content__cards'></div> */}
      <CardFlower setParentCounter={setParentCounter} cards={cards}/>
       {/*  footer */}
    <Footer />
  </>
  );
}

export default App;

