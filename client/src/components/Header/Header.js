import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { onLogoutUser } from './../../redux/user/actions';

import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector(state => state.user);
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
              onClick={() => dispatch(onLogoutUser())}
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