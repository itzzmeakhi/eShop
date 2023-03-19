import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Spinner from '../../components/Spinner/Spinner';
import Alert from '../../components/Alert/Alert';

import { fetchProduct } from './../../redux/products/actions';

import './Pdp.scss';


const Pdp = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [ dispatch, id ]);

  const pdp = useSelector(state => state.pdp);

  const { product, loading, error } = pdp;

  return (
    <div className='pdp'>  
      { loading ? <Spinner /> : error ? <Alert type='error' message={error} /> : (
        <div className='pdp-container'>
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
      )}
    </div>
  );
};

export default Pdp;