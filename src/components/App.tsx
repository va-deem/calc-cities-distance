import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import RouteInfo from './RouteInfo';
import ErrorPage from './ErrorPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/info" element={<RouteInfo />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
