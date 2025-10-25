// import React from 'react'
import "./Header.css";
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

function Header() {
  const { user } = useAuth();

  return (
    <>
      <nav className='navbar'>
        <div className="navContent">
          <div className="logoContainer">
            <Link className='logoLink' to="/">
              <img alt="AD" className="logoImg" src="/img/logo.png" />
            </Link>
          </div>
          <div className='navItemsContainer'>
            <ul className='navList'>
              <li><NavLink to="/home" className={({ isActive }) => isActive ? 'nav-active' : 'nav-li'}>Explorar</NavLink></li>
            </ul>
            <div className="authButtons">
              {user ? (
                <>
                  <ul className='navList'>
                    <li><NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-active' : 'nav-li'}>Perfil</NavLink></li>
                  </ul>
                </>
              ) : (
                <>
                  <Link to="/signup" className='signButton'>
                    Registrarse
                  </Link>
                  <Link to="/login" className='loginButton'>
                    Ingresar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header