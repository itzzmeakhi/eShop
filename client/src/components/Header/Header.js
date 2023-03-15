import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

const Header = () => {
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
        <Link
          to='/signin'
          className='nav__link'>
            Sign In
        </Link>
      </nav>
    </header>
  );
};

export default Header;