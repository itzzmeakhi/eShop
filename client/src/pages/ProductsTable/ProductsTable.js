import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../components/Spinner/Spinner';
import { fetchProducts, removeProduct } from './../../redux/products/actions';

import './ProductsTable.scss';

const ProductsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const productList = useSelector(state => state.productList);

  const { products, loading, productDeleteAndReload } = productList;
  const { loggedInUser } = user;

  useEffect(() => {
    if(loggedInUser && loggedInUser?.isAdmin) {
      dispatch(fetchProducts());
    } else {
      navigate('/');
    }
    
  }, [ dispatch, loggedInUser, navigate, productDeleteAndReload ]);

  const removeProductHandler = (id) => {
    if(window.confirm('Are you sure you want to remove the product')) {
      dispatch(removeProduct(id));
    }
  };

  const editProductHandler = (id) => {
    navigate(`/admin/product/${id}`);
  };

  return (
    <div className='products-table'>
      {loading ? <Spinner /> : (
        <>
          <h1> Products </h1>
          <hr></hr>
          <button 
            onClick={() => navigate('/admin/product')}
            className='create-btn'>
              Create New Product
          </button>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Inventory</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products && products.map(product => (
                <tr key={product._id}>
                  <td>{product.title}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.countInStock}</td>
                  <td>Rs. {product.price}</td>
                  <td>
                    <button className='delete' onClick={() => removeProductHandler(product._id)}>Delete</button>
                    <button className='edit' onClick={() => editProductHandler(product._id)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ProductsTable;