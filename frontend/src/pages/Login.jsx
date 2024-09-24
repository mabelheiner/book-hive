import React from 'react'
import { useState } from 'react'
import { loginUser } from '../components/addUser.mjs';
import Home from './Home';
import UserHome from './UserHome';
import { useNavigate } from 'react-router-dom';

import { setUser } from '../components/user.mjs'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState(null)
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    const result = await loginUser(username, password);

    if (result != 'User not found. Please try again.') {
      setUser(result._id)
      navigate(`/home/?user=${result._id}`)      
    }
    else {
      setLoginMessage(result)
    }
    
  }

  return (
    <div className='login-form'>
        <h1>Login</h1>
        {loginMessage}
        <form onSubmit={login}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" placeholder='beehive' onChange={(e) => setUsername(e.target.value)} required/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder='Book$!' onChange={(e) => setPassword(e.target.value)} required/>
            <button>Login</button>
        </form>
        <p>Don't have a login? Please <a href='/signup'>register.</a></p>
        <p>Want to continue as a <a href='/'>guest?</a></p>
    </div>
  )
}

export default Login