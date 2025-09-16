import React from 'react'
import "./Header.css";

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
          <li>Inicio</li>
          <li>Explorar</li>
          <li>Comunidad</li>
          <li>Contácto</li>
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