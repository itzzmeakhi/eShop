import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductsList from '../../components/ProductsList/ProductsList';

import { fetchProducts } from './../../redux/products/actions';

import './Home.scss';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [ dispatch ]);

  const productList = useSelector(state => state.productList);

  const { products } = productList;

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