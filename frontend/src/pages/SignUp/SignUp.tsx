import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

function SignUp() {

  useEffect(() => {
    console.log(`SignUp mounted`)
  }, [])

  return (
    <>
      <div className="SignUp-component">
        <div className='formContainer'>
          <div className='logoSign'>
            <img src='/img/logo.png'></img>
            <h4>La Esquina Literaria</h4>
          </div>
          <form className='formSign'>
            <label htmlFor="name">Email:</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="email">Confirmar Email:</label>
            <span className='signInfo'>Ingrese nuevamente su correo electrónico.</span>
            <input type="email" id="emailB" name="emailB" />
            <label htmlFor="username">Usuario:</label>
            <span className='signInfo'>Solo letras y números.</span>
            <input type="text" id="username" name="username" />
            <label htmlFor="password">Contraseña:</label>
            <span className='signInfo'>Mínimo 6 caracteres.</span>
            <input type="password" id="password" name="password" />
            <label htmlFor="confirm-password">Confirmar Contraseña:</label>
            <input type="password" id="confirm-password" name="confirm-password" />
            <button className='buttonSign' type="submit">Registrarse</button>
            <Link to="/login" className="login-link">¿Ya estás registrado? Inicia sesión.</Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp;
