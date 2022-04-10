import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Account from "../components/Account";
import Cart from "../components/Cart";
import Chinhsachdoitra from "../components/Chinhsachdoitra";
import Chinhsachgiaohang from "../components/Chinhsachgiaohang";
import ChiTietSanPham from "../components/ChiTietSanPham";
import Dangky from "../components/Dangky";
import Home from "../components/Home";
import Login from "../components/Login";
import Category from "../components/Category";

class DieuHuongURL extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/page/:page" component={Home} />
          <Route exact path="/chinhsachdoitra" component={Chinhsachdoitra} />
          <Route exact path="/chinhsachgiaohang" component={Chinhsachgiaohang} />
          <Route exact path="/dangnhap" component={Login} />
          <Route exact path="/dangky" component={Dangky} />
          <Route exact path="/sanpham/:mshh" component={ChiTietSanPham} />
          <Route exact path="/sanpham/:mshh/comments/page/:page" component={ChiTietSanPham} />
          <Route exact path="/giohang" component={Cart} />
          <Route exact path="/giohang/:mshh?" component={Cart} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/category/:manhom" component={Category} />
          <Route exact path="/category/:keyword" component={Category} />
        </Switch>
      </div>
    );
  }
}

export default DieuHuongURL;
