import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      Error!
      <Link to="/">Home</Link>
    </div>
  );
};

export default ErrorPage;
