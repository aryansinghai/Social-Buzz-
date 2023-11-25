import { useRef } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function Login() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post('https://backend-ppzm.onrender.com/api/auth/register', user);
        navigate('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Social Buzz</h3>
          <p className='loginDesc'>Connect with friends and the world around you on Social Buzz!</p>
        </div>
        <div className='loginRight'>
          <form className='loginBox' onSubmit={handleClick}>
            <input placeholder='UserName' required ref={username} className='loginInput' />
            <input placeholder='Email' type='email' required ref={email} className='loginInput' />
            <input placeholder='Password' type='password' minLength='6' required ref={password} className='loginInput' />
            <input placeholder='Password Again' type='password' minLength='6' required ref={passwordAgain} className='loginInput' />
            <button className='loginButton' type='submit'>
              Sign Up
            </button>
            <Link to={'/login'}>
              <button className='loginRegisterButton'>Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
