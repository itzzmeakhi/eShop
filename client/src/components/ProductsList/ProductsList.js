import React from 'react';

import Product from '../Product/Product';

import './ProductList.scss';

const ProductsList = ({ products }) => {
  return (
    <div className='products__list'>
      {products.map(product => (
        <Product 
          key={product._id}
          product={product} 
        />
      ))}
    </div>
  )
};

export default ProductsList;