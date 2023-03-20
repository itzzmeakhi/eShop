import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { onLogoutUser } from './../../redux/user/actions';

import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector(state => state.user);

  const logoutHandler = () => {
    dispatch(onLogoutUser());
    navigate('/');
  };

  return (
    <header>
      <div className='brand'>
        <Link to='/'>
          eshop
        </Link>
      </div>
      <nav className='nav'>
        <Link
          to='/cart'
          className='nav__link'>
            Cart
        </Link>
        {loggedInUser ? (
          <>
            <Link 
              to='/profile'
              className='nav__link'>
                {loggedInUser.firstName}
            </Link>
            <Link 
              onClick={() => logoutHandler()}
              className='nav__link'>
                Sign out
          </Link>
        </>
        ) : (
          <Link
            to='/login'
            className='nav__link'>
              Sign In
        </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;