import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import Alert from '../../components/Alert/Alert';
import Spinner from '../../components/Spinner/Spinner';

import { onLoginUser } from './../../redux/user/actions';

import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userInfo = useSelector(state => state.user);
  const { loggedInUser, error, loading } = userInfo;
  const redirectPage = location.search ? location.search.split('=')[1] : '';

  useEffect(() => {
    if(loggedInUser) {
      navigate(`/${redirectPage}`);
    }
  }, [ loggedInUser, navigate, redirectPage ]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(onLoginUser({
      email,
      password
    }));
  }

  return (
    <div className='login'>
      <h1>Login here</h1>
      {error && <Alert type='error' message={error} /> }
      <form onSubmit={loginHandler}>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input 
            type='email' 
            id='email' 
            name='email'
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input 
            type='password' 
            id='password'
            name='password'
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {loading ? <Spinner /> : (
          <button 
            className='login-btn'
            type='submit'>
            Login
          </button>
        )}
       <span> New user? <Link to='/register'>Register here</Link></span>
      </form>
    </div>
  );
};

export default Login;