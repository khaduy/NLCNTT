import React, { Component } from 'react';
import './App.css'
import Header from './Header';
import Nav from './Nav';
import DieuHuongURL from './../router/DieuHuongURL';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Hoadon from './Hoadon';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Header />
        <Nav />
        <DieuHuongURL />
      </div>
      <Route exact path="/hoadon/:dh_id" component={Hoadon} />
    </Router>
    );
  }
}

export default App;