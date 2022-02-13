import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route} from "react-router-dom";
import {Chat} from "./Views/Chat/Chat";
import {Login} from "./Views/Join/Login";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Login}/>
      <Route path="/chat" component={Chat}/>
    </Router>
  );
}

export default App;
