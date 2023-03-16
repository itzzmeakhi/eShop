import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProductsList from '../../components/ProductsList/ProductsList';

import './Home.scss';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    }
    fetchProducts();
  }, []);

  console.log('=> products', products);

  return (
    <div className='home'>
      <h2> Latest Products </h2>
      <ProductsList 
        products={products}
      />
    </div>
  );
};

export default Home;