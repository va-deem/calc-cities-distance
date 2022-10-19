import React from 'react';
import './App.css';
import { BrowserRouter, NavLink, Routes, Route, Link } from 'react-router-dom';
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