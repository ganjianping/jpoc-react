import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MuiNavigation from './components/mui/Navigation';
import MuiLoginPage from './components/mui/login';
import MuiForm from './components/mui/features/MuiForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MuiLoginPage />} />
        
        <Route path="/mui/login" element={<MuiLoginPage />} />
        <Route path="/mui/header/*" element={<MuiNavigation />} />
        <Route path="/mui/form" element={<MuiForm />} />

        <Route path="*" element={<h1>404 - Page not found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
