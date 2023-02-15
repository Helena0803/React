import './style.css';
import { Card } from '../Card/Card';
import data from '../../src/data/data.json';
import { useEffect,useState } from 'react';

export const CardFlower = ({ currentUser,cards, setParentCounter,user, handelProductLike }) => {
    return (<div className='cards'>
    {cards.map((item) => { 
 <Card picture={item.picture} />
    return <Card 
    currentUser={currentUser}
    product ={item} 
    onProductLike={handelProductLike} 
    setParentCounter={setParentCounter} 
    {...item} key={item.id} />;
        })}
        </div>
    );
};









