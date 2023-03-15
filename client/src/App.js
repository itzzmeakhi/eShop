import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Pdp from './pages/Pdp/Pdp';

import './App.scss';

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='product/:id' element={<Pdp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
