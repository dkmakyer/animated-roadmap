import {useState} from 'react';
import "./Header.css";
import {NavLink} from 'react-router-dom';
import {Laptop} from '@mui/icons-material';

const Header = () => {

  const links = [
    {id:"1", endpoint:"/", name:"Home"},
    {id:"3", endpoint:"/About", name:"About"},
    {id:"2", endpoint:"/Contact", name:"Contact"},
    {id:"4", endpoint:"/Sign-up", name:"Sign-up"}
  ];

  return (
    <>
      <div className="header-container">
        <div className="app-name">
          <NavLink to="/">Animation <Laptop /></NavLink>
        </div>
        <nav className="links">
          {
            links.map(link => (
              <NavLink 
                key={link.id} 
                to={link.endpoint} 
                className={({isActive}) => isActive ? "active" : ""} 
              >
                {link.name}
              </NavLink>
            ))
          }
        </nav>
      </div>
    </>
  );
};

export default Header;
