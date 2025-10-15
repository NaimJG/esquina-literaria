import { useEffect } from 'react';
import './SignUp.css';

function SignUp() {

  useEffect(() => {
    console.log(`SignUp mounted`)
  }, [])

  return (
    <div className="SignUp-component">
      Test content
    </div>
  )
}

export default SignUp;
