import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "../components/Home";
import PrtAdd from "../components/PrtAdd";
import Login from "../components/Login";
import Dangky from "../components/Dangky";
import OrderListing from "../components/OrderListing";
import OrderDetail from "../components/OrderDetail";
import PrsListing from "../components/PrsListing";
import KhListing from "../components/KhListing";
import NvListing from "../components/NvListing";
import GrListing from "../components/GrListing";
import KhEditing from "../components/KhEditing";
import NvEditing from "../components/NvEditing";
import NvAdd from "../components/NvAdd";
import GrAdd from "../components/GrAdd";
import PrsEditing from "../components/PrsEditing";
class DieuHuongURL extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/orderlisting" component={OrderListing} />
          <Route
            exact
            path="/orderlisting/page/:page"
            component={OrderListing}
          />
          <Route exact path="/orderdetail/:dh_id" component={OrderDetail} />

          <Route exact path="/prslisting" component={PrsListing} />
          <Route exact path="/prslisting/page/:page" component={PrsListing} />
          <Route exact path="/addproduct" component={PrtAdd} />
          <Route exact path="/spediting/:mshh" component={PrsEditing} />

          <Route exact path="/khlisting" component={KhListing} />
          <Route exact path="/khlisting/page/:page" component={KhListing} />
          <Route exact path="/khediting/:sdt" component={KhEditing} />

          <Route exact path="/nvlisting" component={NvListing} />
          <Route exact path="/nvlisting/page/:page" component={NvListing} />
          <Route exact path="/nvediting/:id" component={NvEditing} />
          <Route exact path="/nvadd" component={NvAdd} />

          <Route exact path="/grlisting" component={GrListing} />
          <Route exact path="/grlisting/page/:page" component={GrListing} />
          <Route exact path="/gradd" component={GrAdd} />

          <Route exact path="/dangnhap" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default DieuHuongURL;
