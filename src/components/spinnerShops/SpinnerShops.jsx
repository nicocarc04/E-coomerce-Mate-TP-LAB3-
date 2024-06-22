import React from 'react';
import { Spinner } from 'react-bootstrap';

const SpinnerShops = () => {
  return (
    <div className="spinner-container">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default SpinnerShops;
