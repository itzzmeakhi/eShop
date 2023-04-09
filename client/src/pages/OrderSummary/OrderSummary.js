import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createAnOrder } from './../../redux/cart/actions';

import './OrderSummary.scss';

const OrderSummary = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress, paymentMethod, cartItems, createOrderResponse } = cart;
  const itemsPrice = parseFloat(cartItems.reduce((acc, item) => {
    return acc + (item.qty * item.price);
  }, 0)).toFixed(2);
  const shippingPrice = parseFloat(itemsPrice < 1000 ? 100 : 0).toFixed(2);
  const codPrice = parseFloat(paymentMethod === 'cod' ? 22 : 0).toFixed(2);
  const taxPrice = parseFloat(itemsPrice * 0.02).toFixed(2);
  const totalPrice = parseFloat(itemsPrice + shippingPrice + codPrice + taxPrice).toFixed(2);

  const placeOrderHandler = () => {
    dispatch(createAnOrder({
      orderItems: cartItems,
      shippingAddress,
      billingAddress: shippingAddress,
      paymentMethod,
      shippingPrice,
      codPrice,
      taxPrice,
      totalPrice,
      itemsPrice
    }));
  };

  const success = createOrderResponse?.success;

  useEffect(() => {
    if(success) {
      navigate(`/order/${createOrderResponse?.orderId}`);
    }
  }, [ success, createOrderResponse, navigate ]);

  return (
    <div className='order-summary'>
      <div className='details'>
        <div className='details-section'>
          <h2> Shipping Address </h2>
          <p>{`${shippingAddress.fullAddress}, ${shippingAddress.city}, ${shippingAddress.state}`}</p>
          <p>Pincode: {shippingAddress.pincode}</p>
          <p>Phone: {shippingAddress.contactNum}</p>
        </div>
        <div className='details-section'>
          <h2> Payment Method </h2>
          <p> {paymentMethod} </p>
        </div>
        <div className='details-section'>
          <h2> Order Items </h2>

          <div className='cart-info'>

            {cartItems.length === 0 && (
              <p>No Items in cart</p>
            )}

            {cartItems.map(cItem => (
              <div className='card' key={cItem._id}>
                <img src={cItem.image} alt={cItem.title} />
                <div className='details'>
                  <p className='title'>{cItem.title}</p>
                  <p>Rs. {cItem.price}</p>
                  <p className='qty'>Qty: <span> {cItem.qty} </span> </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
      <div className='price'>
        <h2>Price Summary</h2>
        <p>Items Price: <span> Rs. {itemsPrice} </span></p>
        <p>Shipping Price: <span> Rs. {shippingPrice} </span></p>
        <p>COD Price: <span> Rs. {codPrice} </span></p>
        <p>Tax Price: <span> Rs. {taxPrice} </span></p>
        <p>Total Price: <span> Rs. {totalPrice} </span></p>
        <button onClick={() => placeOrderHandler()}>Place Order</button>
      </div>
    </div>
  );
};

export default OrderSummary;