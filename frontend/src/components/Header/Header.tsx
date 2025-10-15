// import React from 'react'
import "./Header.css";
import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <>
      <nav className='navbar'>
        <div className="navContent">
          <div className="logoContainer">
            <a className='logoLink' href="/">
              <img alt="AD" className="logoImg" src="/img/logo.png" />
            </a>
          </div>
          <div className='navItemsContainer'>
            <ul className='navList'>
              <li><NavLink to="/home" className={({ isActive }) => isActive ? 'nav-active' : 'nav-li'}>Explorar</NavLink></li>
            </ul>
            <div className='authButtons'>
              <Link to="/signup" className='signButton'>
                Registrarse
              </Link>
              <Link to="/login" className='loginButton'>
                Ingresar
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header