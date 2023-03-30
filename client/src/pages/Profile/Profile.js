import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Alert from '../../components/Alert/Alert';
import Spinner from '../../components/Spinner/Spinner';

import { 
  onFetchUserDetails,
  onUpdateUserDetails
} from './../../redux/user/actions';


import './Profile.scss';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editMode, setEditMode] = useState(false);

  const userInfo = useSelector(state => state.user);
  const { 
    loggedInUser, 
    error, 
    loading,
    userDetails 
  } = userInfo;

  useEffect(() => {
    if(!true) {
      navigate('/');
    } else {
      if(userDetails) {
        setFirstName(userDetails?.firstName);
        setLastName(userDetails?.lastName);
        setEmail(userDetails?.email);
        setPassword('');
      } else {
        dispatch(onFetchUserDetails());
      }
    }
  }, [ loggedInUser, navigate, dispatch, userDetails ]);

  const handleCancelEditMode = () => {
    setFirstName(userDetails?.firstName);
    setLastName(userDetails?.lastName);
    setEmail(userDetails?.email);
    setPassword('');
    setEditMode(false);
  };

  const updateUserDetailsHandler = () => {
    const pwd = password.length > 0 ? password : '';
    dispatch(onUpdateUserDetails({
      email,
      password: pwd,
      firstName,
      lastName
    }));
  };

  return (
    <div className='user-details'>
      {loading ? <Spinner /> : (
        <>
          <h1>Hello {userDetails?.fullName}</h1>
          {error && <Alert type='error' message={error} /> }
          <div className='details-container'>
            <>
              {editMode ? (
                <form>
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
                      placeholder='Type to set new password'
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </form>
              ) : (
                <div className='content-box'>
                  <div className='elem'> <p>Firstname:</p> <p>{firstName}</p> </div>
                  <div className='elem'> <p>Lastname:</p> <p>{lastName}</p> </div>
                  <div className='elem'> <p>Email:</p> <p>{email}</p> </div>
                </div>
              )}
            </>
            <div className='details-btns'>
              <button
                onClick={() => editMode ? handleCancelEditMode() : setEditMode(true) }
              >
                {editMode ? 'Cancel' : 'Edit'}
              </button>
              {editMode && (
                <button
                  onClick={() => updateUserDetailsHandler()}
                >
                  Update
                </button>
              )}
            </div>
          </div>
          <div className='orders-container'>

          </div>
        </>
      )}
    </div>
  );
};

export default Register;