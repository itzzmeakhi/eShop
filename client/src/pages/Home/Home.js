import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductsList from '../../components/ProductsList/ProductsList';
import Spinner from '../../components/Spinner/Spinner';
import Alert from '../../components/Alert/Alert';

import { fetchProducts } from './../../redux/products/actions';

import './Home.scss';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [ dispatch ]);

  const productList = useSelector(state => state.productList);

  const { products, loading, error } = productList;

  return (
    <div className='home'>
      <h2> Latest Products </h2>
      { loading ? <Spinner /> : error ? <Alert type='error' message={error} /> : (
        <ProductsList 
          products={products}
        />
      )}
    </div>
  );
};

export default Home;