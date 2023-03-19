import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Spinner from '../../components/Spinner/Spinner';
import Alert from '../../components/Alert/Alert';

import { fetchProduct } from './../../redux/products/actions';

import './Pdp.scss';


const Pdp = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [ dispatch, id ]);

  const pdp = useSelector(state => state.pdp);

  const { product, loading, error } = pdp;

  const {
    title,
    image,
    price,
    description,
    countInStock
  } = product;

  const isItemInStock = countInStock > 0;

  const addToCart = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div className='pdp'>  
      { loading ? <Spinner /> : error ? <Alert type='error' message={error} /> : (
        <div className='pdp-container'>
          <div className='pdp-card image'>
            <img src={image} alt={title} />
          </div>
          <div className='pdp-card details'>
            <h2>{product.title}</h2>
            <p className='price'>Rs. {price}</p>
            <p className='reviews'>Reviews</p>
            <p className='description'>{description}</p>
          </div>
          <div className='pdp-card cta'>
            <p>Price: Rs. {price * qty}</p>
            <p className='status'>Status: <span className={`status__${isItemInStock ? 'in' : 'out'}`}> { isItemInStock ? 'In Stock' : 'Out of Stock'} </span> </p>
            {isItemInStock && (
              <p className='qty'>Qty: 
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(countInStock).keys()].map(val => (
                    <option key={val+1} value={val + 1}>{val + 1}</option>
                  ))}
                </select>
              </p>
            )}
            <button 
              disabled={!isItemInStock}
              onClick={() => addToCart()}>
                Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pdp;