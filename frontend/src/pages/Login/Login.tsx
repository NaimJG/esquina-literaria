import { useEffect } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {

  useEffect(() => {
    console.log(`Login mounted`)
  }, [])

  return (
    <>
    <div className="Login-component">
      <div className='formContainer'>
          <div className='logoSign'>
            <img src='/img/logo.png'></img>
            <h4>La Esquina Literaria</h4>
          </div>
          <form className='formSign'>
            <label htmlFor="username">Usuario:</label>
            <input type="text" id="username" name="username" autoComplete='off' />
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" autoComplete='off' />
            <button className='buttonSign' type="submit">Iniciar Sesión</button>
            <Link to="/signup" className="login-link">¿No estás registrado?</Link>
            <Link to="/forgot" className="login-link">¿Olvidaste tu contraseña?</Link>
          </form>
        </div>
    </div>
    </>
  )
}

export default Login;
