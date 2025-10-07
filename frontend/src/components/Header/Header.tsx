// import React from 'react'
import "./Header.css";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <nav className='navbar'>
        <div className="logoContainer">
          <a className='logoLink' href="/">
            <img alt="AD" className="logoImg" src="/img/logo.png" />
          </a>
        </div>
        <div className='navItemsContainer'>
          <ul className='navList'>
            <li><Link to="/home">Explorar</Link></li>
          </ul>
          <div className='authButtons'>
            <button className='signButton'>
              Registrarse
            </button>
            <button className='loginButton'>
              Ingresar
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header