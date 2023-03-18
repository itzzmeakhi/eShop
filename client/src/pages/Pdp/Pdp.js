import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './Pdp.scss';

const Pdp = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [ id ]);

  return (
    <div className='pdp'>  
      <div className='pdp-card image'>
        <img src={product.image} alt={product.title} />
      </div>
      <div className='pdp-card details'>
        <h2>{product.title}</h2>
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