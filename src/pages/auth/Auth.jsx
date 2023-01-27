import React from 'react';
import './auth.css';
import Logo from '../../img/logo.png';
const Auth = () => {
  return (
    <div className='Auth'>
      <div className='a-left'>
        <img src={Logo} alt='logo' />
        <div className='Webname'>
          <h1>Agamir Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      {/* <SignUp /> */}
      <LogIn />
    </div>
  );
};

function LogIn() {
  return (
    <div className='a-right'>
      <form action='' className='infoForm authForm'>
        <h3>Login</h3>
        <div>
          <input
            type='text'
            name='username'
            className='infoInput'
            placeholder='User name'
          />
        </div>
        <div>
          <input
            type='text'
            name='password'
            className='infoInput'
            placeholder='Password'
          />
        </div>
        <div>
          <span className='already_ac'>You have no account.</span>{' '}
          <span style={{ color: 'var(--orange)' }}>Sign Up!</span>
        </div>
        <button className='button in-btn'>Login</button>
      </form>
    </div>
  );
}

function SignUp() {
  return (
    <div className='a-right'>
      <form action='' className='infoForm authForm'>
        <h3>Sign Up</h3>
        <div>
          <input
            type='text'
            name='firstname'
            placeholder='First Name'
            className='infoInput'
          />
          <input
            type='text'
            name='lastname'
            placeholder='Last Name'
            className='infoInput'
          />
        </div>
        <div>
          <input
            type='text'
            name='username'
            className='infoInput'
            placeholder='User name'
          />
        </div>
        <div>
          <input
            type='text'
            name='password'
            className='infoInput'
            placeholder='Password'
          />
          <input
            type='text'
            name='confirmpassword'
            className='infoInput'
            placeholder='Confirm Password'
          />
        </div>
        <div>
          <span className='already_ac'>Already have an account.</span>{' '}
          <span style={{ color: 'var(--orange)' }}>Login!</span>
        </div>
        <button className='button in-btn'>SignUp</button>
      </form>
    </div>
  );
}

export default Auth;
