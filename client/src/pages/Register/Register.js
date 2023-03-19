import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Alert from '../../components/Alert/Alert';
import Spinner from '../../components/Spinner/Spinner';

import { onRegisterUser } from './../../redux/user/actions';

import './Register.scss';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector(state => state.user);
  const { loggedInUser, error, loading } = userInfo;

  useEffect(() => {
    if(loggedInUser) {
      navigate('/');
    }
  }, [ loggedInUser, navigate ]);

  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(onRegisterUser({
      email,
      password,
      firstName,
      lastName
    }));
  }

  return (
    <div className='register'>
      <h1>Register here</h1>
      {error && <Alert type='error' message={error} /> }
      <form onSubmit={registerHandler}>
        <div className='form-control'>
          <label htmlFor='firstName'>First Name</label>
          <input 
            type='text' 
            id='firstName' 
            name='firstName'
            value={firstName}
            disabled={loading}
            onChange={(e) => setFirstName(e.target.value)} 
          />
        </div>
        <div className='form-control'>
          <label htmlFor='lastName'>Last Name</label>
          <input 
            type='text' 
            id='lastName' 
            name='lastName'
            value={lastName}
            disabled={loading}
            onChange={(e) => setLastName(e.target.value)} 
          />
        </div>
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
            className='register-btn'
            type='submit'>
            Register
          </button>
        )}
       <span> Already have an account? <Link to='/login'>Login here</Link></span>
      </form>
    </div>
  );
};

export default Register;