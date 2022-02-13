import React, {useState} from 'react';

import './Register.css';
import {useHistory} from "react-router-dom";

export const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const register = async () => {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: new Headers(
        {
          'Content-Type': 'application/json'
        }
      ),
      body: JSON.stringify({email, password, username})
    });

    try {
      if (response.status === 201) {
        await response.json();
        history.push('/');
      }
    }
    catch(e) {

    }
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Register</h1>
        <div>
          <input
            placeholder="Username"
            className="joinInput"
            type="text"
            onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div>
          <input
            placeholder="Email"
            className="joinInput"
            type="text"
            onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="password"
            onChange={(event) => setPassword(event.target.value)}/>
        </div>

        <button
          className={'button mt-20'}
          onClick={register}
          type="submit">Register
        </button>

      </div>
    </div>
  );
}
