import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { updateShippingAddress } from './../../redux/cart/actions';

import './Shipping.scss';

const Shipping = () => {
  const { shippingAddress } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullAddress, setFullAddress] = useState(shippingAddress.fullAddress);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [contactNum, setContactNum] = useState(shippingAddress.contactNum);
  const [pincode, setPincode] = useState(shippingAddress.pincode);

  const addShippingAddress = (e) => {
    e.preventDefault();
    dispatch(updateShippingAddress({
      fullAddress,
      city,
      state,
      contactNum,
      pincode
    }));
    setFullAddress('');
    setCity('');
    setState('');
    setContactNum('');
    setPincode('');
    navigate('/payment');
  };

  return (
    <div className='shipping'>
      <h1>Shipping Address</h1>
      <form onSubmit={addShippingAddress}>
        <div className='form-control'>
          <label htmlFor='fullAddress'>Full Address</label>
          <input 
            type='text' 
            id='fullAddress' 
            name='fullAddress'
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)} 
          />
        </div>
        <div className='form-control'>
          <label htmlFor='city'> City </label>
          <input 
            type='text' 
            id='city' 
            name='city'
            value={city}
            onChange={(e) => setCity(e.target.value)} 
          />
        </div>
        <div className='form-control'>
          <label htmlFor='state'> State </label>
          <input 
            type='text' 
            id='state' 
            name='state'
            value={state}
            onChange={(e) => setState(e.target.value)} 
          />
        </div>
        <div className='form-control'>
          <label htmlFor='pincode'>Pincode</label>
          <input 
            type='text' 
            id='pincode' 
            name='pincode'
            value={pincode}
            onChange={(e) => setPincode(e.target.value)} 
          />
        </div>
        <div className='form-control'>
          <label htmlFor='contactNum'>Contact Number</label>
          <input 
            type='text' 
            id='contactNum'
            name='contactNum'
            value={contactNum}
            onChange={(e) => setContactNum(e.target.value)}
          />
        </div>
        <button 
          className='proceed-btn'
          type='submit'>
          Proceed
        </button>
      </form>
    </div>
  );
};

export default Shipping;