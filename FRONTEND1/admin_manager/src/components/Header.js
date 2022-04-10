import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div id="header">
        <div className="container">
          <div className="row">
            <div className=" col-md-5">
              <form className="form-inline">
                <div className="form-group"></div>
              </form>
            </div>
            <div className="col-md-4">
              <Link to="/">
                <img src="/images/logo_3.png" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
