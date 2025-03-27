import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateCompanyAccount from './components/CreateCompanyAccount';
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/createCompanyAccount" element={<CreateCompanyAccount />} />
        <Route path="/loginPage" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
