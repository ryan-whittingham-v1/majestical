import React from 'react';
import Header from './Header';
import JobControl from './JobControl';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <JobControl />
    </Router>
  );
}

export default App;
