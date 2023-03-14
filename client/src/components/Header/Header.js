import React from 'react';

import './Header.scss';

const Header = () => {
  return (
    <header>
      <div className='brand'>
        <a href='#j'>
          eshop
        </a>
      </div>
      <nav className='nav'>
        <a 
          href='#cart'
          className='nav__link'>
            Cart
        </a>
        <a 
          href='#signin'
          className='nav__link'>
            Sign In
        </a>
      </nav>
    </header>
  );
};

export default Header;