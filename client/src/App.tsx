import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import {Chat} from "./Views/Chat/Chat";
import {Join} from "./Views/Join/Join";

const App = () => {
  return (
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
      </Router>
  );
}

export default App;
