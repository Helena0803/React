import './style.css';
import { Card } from '../Card/Card';
import data from '../../src/data/data.json';
import { useEffect,useState } from 'react';

export const CardFlower = ({ cards, setParentCounter }) => {
    return (<div className='cards'>
    {cards.map((item) => { 
 <Card picture={item.picture} />
    return <Card setParentCounter={setParentCounter} {...item} key={item.name} />;
        })}
        </div>
    );
};









