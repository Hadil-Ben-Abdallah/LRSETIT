import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Login.css'


function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   let valid = true;

  //   if (!emailValue) {
  //     setEmailError('Entrez votre email');
  //     valid = false;
  //   } else {
  //     setEmailError('');
  //   }

  //   if (!passwordValue) {
  //     setPasswordError('Entrez votre mot de passe');
  //     valid = false;
  //   } else {
  //     setPasswordError('');
  //   }

  //   if (valid) {
  //     const response = await fetch('http://localhost:8081/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email: emailValue, password: passwordValue }),
  //     });

  //     const data = await response.json();

  //     if (data.success) {
  //       if (rememberMe) {
  //         localStorage.setItem(emailValue, passwordValue);
  //       }
  //       navigate('/home');
  //     } else {
  //       setLoginError('Adresse email ou mot de passe incorrect');
  //     }
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
  
    if (!emailValue) {
      setEmailError('Entrez votre email');
      valid = false;
    } else {
      setEmailError('');
    }
  
    if (!passwordValue) {
      setPasswordError('Entrez votre mot de passe');
      valid = false;
    } else {
      setPasswordError('');
    }
  
    if (valid) {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue, password: passwordValue }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        if (rememberMe) {
          localStorage.setItem(emailValue, passwordValue);
        }
        localStorage.setItem('cinInsc', data.cinInsc); // Save cinInsc in local storage
        navigate('/home');
      } else {
        setLoginError('Adresse email ou mot de passe incorrect');
      }
    }
  };
  

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmailValue(email);

    const savedPassword = localStorage.getItem(email);
    if (savedPassword) {
      setPasswordValue(savedPassword);
    } else {
      setPasswordValue('');
    }
  };

  return (
    <div className='wrapper bg-dark d-flex align-items-center justify-content-center w-100'>
      <div className='login'>
        <h2 className='mb-3 member'>Espace membre</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className='form-group mb-2'>
            <label htmlFor="email" className='form-label'>Adresse email</label>
            <input
              type="email"
              className={`form-control ${emailError ? 'is-invalid' : ''}`}
              value={emailValue}
              onChange={handleEmailChange}
            />
            <div className='invalid-feedback'>
              {emailError}
            </div>
          </div>
          <div className='form-group mb-2 password-field'>
            <label htmlFor="password" className='form-label'>Mot de passe</label>
            <div className='password-container'>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              {passwordValue && (
                <span className='eye-icon' onClick={togglePasswordVisibility}>
                  {isPasswordVisible ? (
                    <FontAwesomeIcon icon="fa-regular fa-eye-slash" />
                  ) : (
                    <FontAwesomeIcon icon="fa-regular fa-eye" />
                  )}
                </span>
              )}
            </div>
            <div className='invalid-feedback'>
              {passwordError}
            </div>
          </div>
          <div className='form-group mb-2 form-check'>
            <input
              type="checkbox"
              className='form-check-input'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="check" className='form-check-label'>Souviens-toi de moi</label>
          </div>
          {loginError && (
            <div className="alert alert-danger" role="alert">
              {loginError}
            </div>
          )}
          <button type='submit' className='btn btn-success w-100 mt-2 log'>CONNEXION</button>
          <Link to="/inscription" className='btn w-100 insc'>Inscription</Link>
        </form>
      </div>
    </div>
  );
}
export default Login;