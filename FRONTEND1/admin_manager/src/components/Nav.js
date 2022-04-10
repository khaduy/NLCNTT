import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";


class Nav extends React.Component {
  constructor(){
    super();
    this.state = {
      isAdmin : false,
    }
  }
  getUser(){
    let userInfo = localStorage.getItem("userInfo");
    let isAdmin ;
    if(userInfo){
      let user = JSON.parse(userInfo);
      if(user.userInfo.username == "admin"){
        isAdmin = true;
      }
    }
    
    return isAdmin;
  }

  render() {
    //get userInfo tu localStorage de xem co phai admin k 
    let isAdmin = this.getUser();
    console.log("is")
    return (
      <div id="menunav">
        <div className="container">
          <nav>
            <ul className="menu-main">
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>
                <Link to="/orderlisting">Quản lý đơn hàng </Link>
              </li>
              <li>
                <Link to="/khlisting">Quản lý khách hàng </Link>
              </li>
              {isAdmin ?
                <li>
                  <Link to="/nvlisting">Quản lý nhân viên </Link>
                </li> : null
              }
              <li>
                <Link to="/grlisting">Quản lý nhóm sản phẩm </Link>
              </li>
              <li>
                <Link to="/prslisting">Quản lý sản phẩm </Link>
              </li>
            </ul>
            {/* menu-main */}
            
            {/* end menu-main */}
          </nav>
        </div>
      </div>
    );
  }
}

export default Nav;
