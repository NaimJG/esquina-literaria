import { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import userService from '../../service/userService';

function Login() {

  const [formData, setFormData] = useState({ username: '', password: '' });
  // const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  // const showAlert = (message, type) => {
  //   setAlert({ show: true, message, type });
  //   setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  // };

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
      console.log('Por favor, completa todos los campos');
      // showAlert('Por favor, completa todos los campos', 'error');
      return;
    }

    setLoading(true);
    try {
      const data = await userService.loginUser(formData);

      console.log('Login response:', data);
      login(data.user);
      console.log('Usuario logueado:', data.user);
      // showAlert('¡Bienvenido! Iniciando sesión...', 'success');
      setTimeout(() => {
        navigate('/home');
        setLoading(false);
      }, 1000);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Error durante el inicio de sesión:', message);
      alert(message);
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
            <Link to="/signup" className="login-link">¿No estás registrado?</Link>
            <Link to="/forgot" className="login-link">¿Olvidaste tu contraseña?</Link>
          </form>
        </div>
    </div>
    </>
  )
}

export default Login;