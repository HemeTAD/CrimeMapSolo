import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ title }) => {
  const location = useLocation();

  const renderButtons = () => {
    if (location.pathname === "/reports") {
      return (
        <div className='Link-holder'>
          
          <Link className='header-link' to="/">Report</Link>
        </div>
      );
    } else if (location.pathname === "/") {
      return (
        <div className='Link-holder'>
          <Link className='header-link' to="/reports">Crimes</Link>
        </div>
      );
    } else if (location.pathname.includes("/details")) {
      const userId = location.pathname.split("/")[1];
      return (
        <div className='Link-holder'>
          <Link className='header-link' to="/reports">Crimes</Link>
          <Link className='header-link' to={`/${userId}/edit`}>Update</Link>
        </div>
      );
    } else if (location.pathname.includes("/edit")) {
      const userId = location.pathname.split("/")[1];
      return (
        <div className='Link-holder'>
          <Link className='header-link' to="/reports">Crimes</Link>
          <Link className='header-link' to={`/${userId}/details`}>Details</Link>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <header className="header">
      <h1 style={{color: "blue"}} className="header-title">{title}</h1>
      {renderButtons()}
    </header>
  );
};

export default Header;
