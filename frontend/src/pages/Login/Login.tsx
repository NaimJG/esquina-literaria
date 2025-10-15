import { useEffect } from 'react';
import './Login.css';

function Login() {

  useEffect(() => {
    console.log(`Login mounted`)
  }, [])

  return (
    <div className="Login-component">
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" />
      <button type="submit">Login</button>  
    </div>
  )
}

export default Login;
