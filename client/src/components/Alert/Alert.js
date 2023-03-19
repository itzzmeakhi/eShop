import React from 'react';

import './Alert.scss';

const Alert = ({ type, message }) => {
  return (
    <div className={`alert alert__${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default Alert;