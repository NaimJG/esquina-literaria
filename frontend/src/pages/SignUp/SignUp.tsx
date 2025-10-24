import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import userService from '../../service/userService';
import * as React from 'react';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.email !== confirmEmail) {
      alert("Los correos electrónicos no coinciden.");
      return;
    }

    if (formData.password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    
    const userData = {
      email: formData.email,
      username: formData.username,
      password: formData.password
    };

    try {
      await userService.registerUser(userData);
      alert('¡Registro exitoso!');
      navigate('/login');
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Hubo un error durante el registro.");
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
            
            <button className='buttonSign' type="submit">Registrarse</button>
            <Link to="/login" className="login-link">¿Ya estás registrado? Inicia sesión.</Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp;
