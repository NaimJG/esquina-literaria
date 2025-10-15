import { useEffect } from 'react';
import './Login.css';

function Login() {

  useEffect(() => {
    console.log(`Login mounted`)
  }, [])

  return (
    <div className="Login-component">
      Test content
    </div>
  )
}

export default Login;
