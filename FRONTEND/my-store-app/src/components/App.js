import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Nav from './Nav';
import DieuHuongURL from './../router/DieuHuongURL';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Nav />
          <DieuHuongURL />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
