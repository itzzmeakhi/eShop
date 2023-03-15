import React from 'react';

import ProductsList from '../../components/ProductsList/ProductsList';

import './Home.scss';

import products from './../../products';

const Home = () => {
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