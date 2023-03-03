import React, { useState } from 'react';
import './auth.css';
import Logo from '../../img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction.js';
const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const [isSignup, setIsSignup] = useState(true);
  const [confirmPass, setConfirmPass] = useState(true);
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmpassword: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      data.password === data.confirmpassword
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      confirmpassword: '',
    });
  };
  return (
    <div className='Auth'>
      <div className='a-left'>
        <img src={Logo} alt='logo' />
        <div className='Webname'>
          <h1>Agamir Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      <div className='a-right'>
        <form action='' className='infoForm authForm' onSubmit={handleSubmit}>
          <h3>{isSignup ? 'Sign Up' : 'Login'}</h3>
          {isSignup && (
            <div>
              <input
                type='text'
                name='firstname'
                placeholder='First Name'
                className='infoInput'
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type='text'
                name='lastname'
                placeholder='Last Name'
                className='infoInput'
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}
          <div>
            <input
              type='text'
              name='username'
              className='infoInput'
              placeholder='User name'
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type='password'
              name='password'
              className='infoInput'
              placeholder='Password'
              onChange={handleChange}
              value={data.password}
            />
            {isSignup && (
              <input
                type='password'
                name='confirmpassword'
                className='infoInput'
                placeholder='Confirm Password'
                onChange={handleChange}
                value={data.confirmpassword}
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? 'none' : 'block',
              color: 'red',
              fontSize: '12px',
              alignSelf: 'flex-end',
              marginRight: '5px',
            }}
          >
            * Confirm Password is not same
          </span>
          {isSignup ? (
            <div
              className='already_ac'
              onClick={() => {
                setIsSignup((prev) => !prev);
                resetForm();
              }}
            >
              <span>Already have an account</span> <span>Login!</span>
            </div>
          ) : (
            <div
              className='already_ac'
              onClick={() => {
                setIsSignup((prev) => !prev);
                resetForm();
              }}
            >
              <span>You have no account</span> <span>Sign Up!</span>
            </div>
          )}
          <button className='button in-btn' type='submit' disabled={loading}>
            {loading ? 'Loading...' : isSignup ? 'SignUp' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
