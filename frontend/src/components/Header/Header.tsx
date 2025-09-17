import React from 'react'
import "./Header.css";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <nav className='navbar'>
        <h1 className="logoContainer">
          <a className='logoLink' href="/">
            <img alt="AD" className="logoImg" src="/img/logo.png" />
          </a>
        </h1>
        <ul className='navList'>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/catalogue">Explorar</Link></li>
          <li><Link to="/community">Comunidad</Link></li>
          <li><Link to="/store">Tienda</Link></li>
        </ul>
        <div className='authButtons'>
          <button className='signButton'>
            Registrarse
          </button>
          <button className='loginButton'>
            Ingresar
          </button>
        </div>
      </nav>
    </>
  )
}

export default Header