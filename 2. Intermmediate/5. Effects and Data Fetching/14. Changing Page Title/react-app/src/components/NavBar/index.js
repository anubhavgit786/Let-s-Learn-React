import React from 'react';


//Structural Component
const NavBar = ({ children })=>
{
  return(
  <nav className="nav-bar">{children}</nav>)
}

export default NavBar;
