import React from "react";
import "./Header.css";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import Avatar from "@mui/material/Avatar";
import { Tooltip } from "@mui/material";
import { useLocation } from "react-router-dom";

function Header() {
  const { user } = useAuth();
  const location = useLocation();

  // Determinar active basándonos también en location.state
  const state = (location.state as { showLogin?: boolean; showRegister?: boolean } | null) ?? null;
  const isLoginActive = location.pathname === '/' && !!state?.showLogin;
  const isRegisterActive = location.pathname === '/' && !!state?.showRegister;

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name: string) {
    const nameParts = name.split(' ');
    const initials = (nameParts[0]?.[0] || '') + (nameParts[1]?.[0] || '');
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: initials.toUpperCase(),
    };
  }

  return (
    <>
      <nav className='navbar'>
        <div className="navContent">
          <div className="logoContainer">
            <div className='logoLink'>
              <img alt="AD" className="logoImg" src="/img/logo.png" />
            </div>
          </div>
          <div className='navItemsContainer'>
            <div className="authButtons">
              {user ? (
                <>
                  <ul className='navList navCart'>
                    <li><NavLink to="/home" className={({ isActive }) => isActive ? 'nav-active' : 'nav-li'}>Explorar</NavLink></li>
                    {/* <li className="cartContainer">
                      <Tooltip title="Carrito">
                        <ShoppingCartIcon></ShoppingCartIcon>
                      </Tooltip>
                    </li> */}
                    <li style={{ alignSelf: 'center' }}>
                      <Tooltip title="Ver Perfil">
                        <NavLink to="/profile">
                          <Avatar {...stringAvatar(user.username)} />
                        </NavLink>
                      </Tooltip>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                <ul className='navList' style={{ justifyContent: 'flex-end' }}>
                  <li>
                    <NavLink
                      to="/"
                      state={{ showRegister: true }}
                      className={() => isRegisterActive ? 'nav-active' : 'nav-li'}
                    >
                      Registrarse
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/"
                      state={{ showLogin: true }}
                      className={() => isLoginActive ? 'nav-active' : 'nav-li'}
                    >
                      Ingresar
                    </NavLink>
                  </li>
                </ul>
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