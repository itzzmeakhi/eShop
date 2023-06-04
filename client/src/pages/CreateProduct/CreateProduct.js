import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// import Alert from '../../components/Alert/Alert';
import Spinner from '../../components/Spinner/Spinner';

import { 
  fetchProduct, 
  updateProductById,
  createProduct 
} from '../../redux/products/actions';

import './CreateProduct.scss';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');

  const { productId } = params;
  const userInfo = useSelector(state => state.user);
  const { product, loading } = useSelector(state => state.pdp);

  const { 
    loggedInUser
  } = userInfo;

  useEffect(() => {
    if(!loggedInUser) {
      navigate('/login');
    } else {
      if (productId && product._id !== productId) {
        dispatch(fetchProduct(productId));
      }
    }
  }, [ loggedInUser, navigate, dispatch, productId, product ]);

  useEffect(() => {
    if(productId) {
      setTitle(product?.title ? product.title : '');
      setBrand(product?.brand ? product.brand : '');
      setCategory(product?.category ? product.category : '');
      setCountInStock(product?.countInStock ? product.countInStock : 0);
      setDescription(product?.description ? product.description : '');
      setImage(product?.image ? product.image : '');
      setPrice(product?.price ? product.price : '');
    }
  }, [ product, productId ]);

  const updateProductHandler = async (id) => {
    await dispatch(updateProductById({
      id,
      title,
      description,
      image,
      brand,
      category,
      price,
      countInStock
    }));
    navigate('/admin/products');
  };

  const createProductHandler = async () => {
    await dispatch(createProduct({
      title,
      description,
      image,
      brand,
      category,
      price,
      countInStock
    }));
    navigate('/admin/products');
  };

  const isValidProdAdded = title.length > 0 && description.length > 0 && brand.length > 0 && category.length > 0 && image.length > 0;

  return (
    <div className='prod-form'>
      {loading ? <Spinner /> : (
        <>
          <h1>{productId ? 'Edit Product' : 'Create Product'}</h1>
          <hr></hr>
          {/* {error && <Alert type='error' message={error} /> } */}
          <div className='details-container'>
            <>
              <form>
                <div className='form-control'>
                  <label htmlFor='title'>Title</label>
                  <input 
                    type='text' 
                    id='title' 
                    name='title'
                    value={title}
                    disabled={loading}
                    onChange={(e) => setTitle(e.target.value)} 
                  />
                </div>
                <div className='form-control'>
                  <label htmlFor='brand'>Brand</label>
                  <input 
                    type='text' 
                    id='brand' 
                    name='brand'
                    value={brand}
                    disabled={loading}
                    onChange={(e) => setBrand(e.target.value)} 
                  />
                </div>
                <div className='form-control'>
                  <label htmlFor='brand'>Category</label>
                  <input 
                    type='text' 
                    id='category' 
                    name='category'
                    value={category}
                    disabled={loading}
                    onChange={(e) => setCategory(e.target.value)} 
                  />
                </div>
                <div className='form-control'>
                  <label htmlFor='desc'>Description</label>
                  <textarea 
                    type='text' 
                    id='desc'
                    name='desc'
                    value={description}
                    disabled={loading}
                    rows={6}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className='form-control'>
                  <label htmlFor='count'>Count In Stock</label>
                  <input 
                    type='number' 
                    id='count' 
                    name='count'
                    value={countInStock}
                    disabled={loading}
                    onChange={(e) => setCountInStock(e.target.value)} 
                  />
                </div>
                <div className='form-control'>
                  <label htmlFor='image'>Image</label>
                  <input 
                    type='text' 
                    id='image'
                    name='image'
                    value={image}
                    disabled={loading}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className='form-control'>
                  <label htmlFor='price'>Price</label>
                  <input 
                    type='number' 
                    id='price' 
                    name='price'
                    value={price}
                    disabled={loading}
                    onChange={(e) => setPrice(e.target.value)} 
                  />
                </div>
              </form>
            </>
            <div className='details-btns'>
              <button 
                className='cancel-btn' 
                onClick={() => navigate('/admin/products')}>
                  Cancel
              </button>
              {productId ? (
                <button 
                  className='update-btn'
                  onClick={() => updateProductHandler(productId)}>
                    Update
                </button>
              ) : (
                <button 
                  className='create-btn'
                  disabled={!isValidProdAdded}
                  onClick={() => createProductHandler()}>
                    Create
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateProduct;