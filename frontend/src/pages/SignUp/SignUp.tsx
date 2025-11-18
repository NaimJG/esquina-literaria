import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import userService from '../../service/userService';
import * as React from 'react';
import { useAuth } from '../../context/useAuth';
import { Alert } from '@mui/material';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    if (formData.email !== confirmEmail) {
      setValidationError("Los correos electrónicos no coinciden.");
      setLoading(false);
      setTimeout(() => {
        setValidationError(null);
      }, 4000);
      return;
    }

    if (formData.password !== confirmPassword) {
      setValidationError("Las contraseñas no coinciden.");
      setLoading(false);
      setTimeout(() => {
        setValidationError(null);
      }, 4000);
      return;
    }
    
    const userData = {
      email: formData.email,
      username: formData.username,
      password: formData.password
    };

    try {
      await userService.registerUser(userData);
      setSuccessMessage('¡Registro exitoso!');
      login(userData);
      setTimeout(() => {
        navigate('/home');
      }, 1000);
      setLoading(false);
      setValidationError(null);
    } catch (error) {
      console.error("Error en el registro:", error);
      setLoading(false);
      setValidationError("Hubo un error durante el registro.");
            setTimeout(() => {
        setValidationError(null);
      }, 4000);
    }
  };

  return (
    <>
      <div className="SignUp-component">
        <div className='formContainer'>
          <div className='logoSign'>
            <img src='/img/logo.png' alt="Logo"></img>
            <h4>La Esquina Literaria</h4>
          </div>
          <form className='formSign' onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="emailB">Confirmar Email:</label>
            <span className='signInfo'>Ingrese nuevamente su correo electrónico.</span>
            <input type="email" id="emailB" name="emailB" value={confirmEmail} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmEmail(e.target.value)} required />
            
            <label htmlFor="username">Usuario:</label>
            <span className='signInfo'>Solo letras y números.</span>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
            
            <label htmlFor="password">Contraseña:</label>
            <span className='signInfo'>Mínimo 6 caracteres.</span>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} autoComplete="new-password" required />
            
            <label htmlFor="confirm-password">Confirmar Contraseña:</label>
            <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} autoComplete="new-password" required />
            
            <button className='buttonSign' type="submit" disabled={loading}>{loading ? 'Cargando...' : 'Registrarse'}</button>
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
            <Link to="/login" className="login-link">¿Ya estás registrado? Inicia sesión.</Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp;
