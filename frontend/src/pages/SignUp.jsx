import React, { useState } from 'react'
import axios from 'axios';
import {encryptNewPassword, sayHello} from '../components/encrypt.mjs';
import { useParams } from 'react-router-dom';
import { addNewUser } from '../components/addUser.mjs';

const SignUp = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');

    const addUser = async (e) => {
        e.preventDefault()
        
        const result = await addNewUser(username, password, firstName, lastName, email)
        window.location.href = `/login`;
    }

  return (
    <div className='signup-form'>
        <h1>Sign Up</h1>
        <form onSubmit={addUser}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" onChange={(e) => setFirstname(e.target.value)}/>

            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" onChange={(e) => setLastname(e.target.value)}/>

            <label htmlFor="email">Email</label>
            <input type="email" name="userEmail" id="userEmail" onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="username">username</label>
            <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)}/>

            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>

            <button>Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp