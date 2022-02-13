import React, {useState} from 'react';

import './Login.css';
import {useHistory} from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const login = async () => {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: new Headers(
        {
          'Content-Type': 'application/json'
        }
      ),
      body: JSON.stringify({email, password})
    });

    const data = await response.json();
    window.localStorage.setItem('access-token', data.accessToken);
    history.push('/Chat?name=hej&room=61e68a6a6642d355e0004a91');
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Login</h1>
        <div>
          <input
            placeholder="Username"
            className="joinInput"
            type="text"
            onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <div>
          <input
            placeholder="Password"
            className="joinInput mt-20"
            type="password"
            onChange={(event) => setPassword(event.target.value)}/>
        </div>

        <button
          className={'button mt-20'}
          onClick={login}
          type="submit">Log In
        </button>

      </div>
    </div>
  );
}
