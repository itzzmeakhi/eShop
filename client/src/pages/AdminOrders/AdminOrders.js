import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../components/Spinner/Spinner';

import { fetchAllOrdersByAllUsers } from '../../redux/order/actions';

import './AdminOrders.scss';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector(state => state.user);
  const orderDetails = useSelector(state => state.orderDetails);

  const { orders, loading } = orderDetails;

  const { 
    loggedInUser
  } = userInfo;

  const isAdmin = !!loggedInUser?.isAdmin;

  useEffect(() => {
    if(!loggedInUser && !isAdmin) {
      navigate('/login');
    } else {
      dispatch(fetchAllOrdersByAllUsers());
    }
  }, [ loggedInUser, navigate, isAdmin, dispatch ]);

  return (
    <div className='admin-orders'>
      {loading ? <Spinner /> : (
        <>
          <h2>Orders</h2>
          <hr></hr>
          <div className='orders-container'>
            <>
              {orders.map((order, index) => {
                return (
                  <div className='order-card' key={order._id} onClick={() => navigate(`/orders/${order._id}`)}>
                    <span>{index+1}.</span>
                    <span>{order._id}</span>
                    <span>{new Date(order.createdAt).toDateString()}</span>
                    <span>Rs. {order.totalPrice}</span>
                    <span>{order.isPaid ? 'Paid' : 'Not Paid'}</span>
                    <span>{order.isDelivered ? 'Delivered' : 'Not Delivered'}</span>
                  </div>
                )
              })}
            </>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrders;