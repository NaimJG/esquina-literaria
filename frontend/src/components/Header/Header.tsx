import React from "react";
import "./Header.css";
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import Avatar from "@mui/material/Avatar";
import { Tooltip } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header() {
  const { user } = useAuth();

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
                  <ul className='navList navCart' style={{ alignItems: 'center' }}>
                    <li className="cartContainer">
                      <Tooltip title="Carrito">
                        <ShoppingCartIcon></ShoppingCartIcon>
                      </Tooltip>
                    </li>
                    <li>
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