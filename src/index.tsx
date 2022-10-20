import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './components/App';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
