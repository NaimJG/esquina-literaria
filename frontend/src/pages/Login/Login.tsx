import { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import userService from '../../service/userService';
import { Alert } from '@mui/material';

function Login() {

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGuestAccess = () => {
    console.log('Acceso como invitado');
    navigate('/home');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setValidationError('Por favor, completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const data = await userService.loginUser(formData);

      console.log('Login response:', data);
      login(data.user);
      console.log('Usuario logueado:', data.user);
      setSuccessMessage("¡Inicio de sesión exitoso!");
      setTimeout(() => {
        navigate('/home');
        setLoading(false);
      }, 1000);
      setValidationError(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Error durante el inicio de sesión:', message);
      setValidationError(message);
      setTimeout(() => {
        setValidationError(null);
      }, 4000);
      setLoading(false);
    }
  };

  return (
    <>
    <div className="Login-component">
      <div className='formContainer'>
          <div className='logoSign'>
            <img src='/img/logo.png'></img>
            <h4>La Esquina Literaria</h4>
          </div>
          <form className='formSign' onSubmit={handleSubmit}>
            <label htmlFor="username">Usuario:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} autoComplete='off' required/>
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} autoComplete='off' required/>
            <button className='buttonSign' type="submit" disabled={loading}>{loading ? 'Ingresando...' : 'Iniciar Sesión'}</button>
            {validationError && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                {validationError}
              </Alert>
            )}
            {successMessage && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {successMessage}
              </Alert>
            )}
            <button className="guestButton" type="button" onClick={handleGuestAccess}>¡Explora como invitado!</button>
            <Link to="/signup" className="login-link">¿No estás registrado?</Link>
            <Link to="/forgot" className="login-link">¿Olvidaste tu contraseña?</Link>
          </form>
        </div>
    </div>
    </>
  )
}

export default Login;