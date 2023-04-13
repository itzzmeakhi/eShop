import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import Spinner from '../../components/Spinner/Spinner';

import { fetchOrderDetails } from './../../redux/order/actions';

import './OrderDetails.scss';

const OrderDetails = () => {
  const orderDetails = useSelector(state => state.orderDetails);
  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const { order, loading } = orderDetails;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [id, dispatch]);

  const {
    shippingAddress,
    billingAddress,
    paymentMethod,
    orderItems,
    createdAt,
    itemsPrice,
    codPrice,
    taxPrice,
    totalPrice,
    shippingPrice,
    user,
    isPaid,
    isDelivered
  } = order;

  useEffect(() => {
    if(!loggedInUser) {
      navigate(`/login?redirect=orders/${id}`);
    }
  }, [loggedInUser, navigate, id]);

  return (
    <div className='order-details'>
       {loading ? <Spinner /> : (
        <>
          {order && (
            <>
              <div className='summary'>
                <div className='card order-details'>
                  <h2>Order Details</h2>
                  <p>Order Id: {id}</p>
                  <p>Ordered on: {new Date(createdAt).toDateString()} </p>
                  <p>Payment status: <span>{ isPaid ? 'Paid' : 'Not Paid' }</span></p>
                  <p>Delivery status: <span>{ isDelivered ? 'Delivered' : 'Not Delivered' }</span></p>
                </div>
                <div className='card'>
                  <h2>Billing Address</h2>
                  <p><strong>{user?.fullName}</strong></p>
                  <p>{`${billingAddress?.fullAddress}, ${billingAddress?.city}, ${billingAddress?.state}`}</p>
                  <p>Pincode: {billingAddress?.pincode}</p>
                  <p>Contact: {billingAddress?.contactNum} </p>
                </div>

                <div className='card'>
                  <h2>Shipping Address</h2>
                  <p>{`${shippingAddress?.fullAddress}, ${shippingAddress?.city}, ${shippingAddress?.state}`}</p>
                  <p>Pincode: {shippingAddress?.pincode}</p>
                  <p>Contact: {shippingAddress?.contactNum} </p>
                </div>

                <div className='card'>
                  <h2>Payment Method</h2>
                  <p>Method: {paymentMethod} </p>
                </div>

                <div className='card'>
                  <h2>Items Summary</h2>
                  <div className='cart-info'>
                    {orderItems?.length === 0 && (
                      <p>No Items in cart</p>
                    )}

                    {orderItems?.map(cItem => (
                      <div className='item-card' key={cItem._id}>
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
              </div>
            </>
          )}
         </>
        )}
    </div>
  );
};

export default OrderDetails;