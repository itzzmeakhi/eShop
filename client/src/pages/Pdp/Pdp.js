import React from 'react';
import { useParams } from 'react-router-dom';

import products from './../../products';

import './Pdp.scss';

const Pdp = () => {
  const { id } = useParams();
  const product = products.find(p => p._id === id);

  return (
    <div className='pdp'>  
      <div className='pdp-card image'>
        <img src={product.image} alt={product.name} />
      </div>
      <div className='pdp-card details'>
        <h2>{product.name}</h2>
        <p className='price'>Rs. {product.price}</p>
        <p className='reviews'>Reviews</p>
        <p className='description'>{product.description}</p>
      </div>
      <div className='pdp-card cta'>
        <p>Price: Rs. {product.price}</p>
        <p>Status:</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default Pdp;