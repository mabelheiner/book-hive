import React from 'react'
import { useState } from 'react'
import { decryptPassword } from '../components/encrypt.mjs';
import { loginUser } from '../components/addUser.mjs';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState(null)

  async function login(e) {
    e.preventDefault();

    const result = await loginUser(username, password);

    if (result != 'User not found. Please try again.') {
      window.location.href = `/addBook/${result._id}`;
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
    </div>
  )
}

export default Login