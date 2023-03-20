import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import { addToCart, onRemoveItemFromCart } from './../../redux/cart/actions';

import './Cart.scss';

const Cart = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const cartItems = useSelector(state => state.cart.cartItems);

  const { totalPrice, totalItems } = cartItems.reduce((acc, item) => {
    const newPrice = acc.totalPrice + (item.qty * item.price);
    const newItems = acc.totalItems + item.qty;
    return { totalItems: newItems, totalPrice: newPrice };
  }, { totalPrice: 0, totalItems: 0 });

  useEffect(() => {
    if(productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [ dispatch, productId, qty ]);

  console.log('=> cartItems', cartItems);

  return (
    <div className='cart'>
      <div className='cart__info'>
        <h1> Shopping Cart </h1>
        {cartItems.length === 0 && (
          <p>No Items in cart</p>
        )}
        {cartItems.map(cItem => (
          <div className='card' key={cItem.productId}>
            <img src={cItem.image} alt={cItem.title} />
            <div className='details'>
              <p className='title'>{cItem.title}</p>
              <p>Rs. {cItem.price}</p>
              <p className='qty'>Qty: 
                <select value={cItem.qty} onChange = {(e) => dispatch(addToCart(cItem.productId, e.target.value))}>
                  {[...Array(cItem.countInStock).keys()].map(val => (
                    <option key={val+1} value={val + 1}>{val + 1}</option>
                  ))}
                </select>
              </p>
              <span 
                className='remove' 
                onClick={() => dispatch(onRemoveItemFromCart(cItem.productId))}>
                  Remove 
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-2 h-2'>
                    <path fill-rule='evenodd' d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z' clip-rule='evenodd' />
                  </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
      {cartItems.length > 0 && (
        <div className='cart__total'>
          <h2> Subtotal of {totalItems} items </h2>
          <p> Price: Rs. ${totalPrice.toFixed(2)} </p>
          <button>Proceed to Checkout</button>
          <span>Clear cart</span>
        </div>
      )}
    </div>
  );
};

export default Cart;