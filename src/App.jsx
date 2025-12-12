import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header.jsx';
import HomePage from './Components/HomePage.jsx';
import Hero from './Form/Hero.jsx';
import Log from './Form/Log.jsx';
import Sign from './Form/Sign.jsx';
import User from './Dashboard/User.jsx';
import About from './Components/About.jsx'
import PaymentVerify from './Dashboard/PaymentVerify.jsx';
import Market from './Dashboard/Market.jsx';
import AdminDashboard from './Dashboard/Admin.jsx';

function App() {
  const location = useLocation();

  // Hide header on login/signup page
  const hideHeaderRoutes = ['/log', '/user', '/admin'];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/log" element={<Log />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/user" element={<User />} />
        <Route path="/about" element={<About />} />
        <Route path="/payment/verify" element={<PaymentVerify />} />
        <Route path="/market" element={<Market />} />
        <Route path="/admin" element={<AdminDashboard />} />


      </Routes>
    </>
  );
}

export default App;