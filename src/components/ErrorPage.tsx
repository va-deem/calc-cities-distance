import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const ErrorPage = () => (
  <Box textAlign="center">
    <p>The route does not exist. Sorry.</p>
    <p>¯\_(ツ)_/¯</p>
    <Link to="/" className="visited-link">
      Home page
    </Link>
  </Box>
);

export default ErrorPage;
