import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRoutes';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
