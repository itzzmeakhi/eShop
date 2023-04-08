import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addPaymentMethod } from './../../redux/cart/actions';

import './PaymentMethod.scss';

const PaymentMethod = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(cart.paymentMethod);

  const updatePaymentMethodAndProceed = (e) => {
    e.preventDefault();
    dispatch(addPaymentMethod(paymentMethod));
    navigate('/summary');
  };

  return (
    <div className='payment'>
        <h1> Payment Method </h1>
        <form onSubmit={updatePaymentMethodAndProceed}>
          <div className='form-control'>
            <input 
              type='radio' 
              id='cod' 
              value='cod'
              name='payment'
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)} 
            />
            <label htmlFor='cod'> Cash on Delivery </label>
          </div>
          {/* <div className='form-control'>
            <input 
              type='radio' 
              id='paypal'
              value='paypal'
              name='payment'
              checked={paymentMethod === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor='password'> Paypal </label>
          </div> */}
          <button 
            className='proceed-btn'
            type='submit'>
            Proceed
          </button>
      </form>
    </div>
  );
};

export default PaymentMethod;