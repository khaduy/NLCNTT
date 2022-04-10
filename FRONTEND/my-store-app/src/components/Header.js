import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import LiveSearchContainer from "./LiveSearchContainer";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      query: "",
      result: {},
      open: false,
      isLeave: false,
    };
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  getProductData = (name) => {
    return axios
      .get(`/search/name=${name}`)
      .then((res) => {
        this.setState({
          data: res.data,
          loading: true,
          query: name,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name);
    console.log(value);
    if (!value) {
      this.setState({
        loading: false,
        query: "",
        data: [],
      });
    } else {
      this.getProductData(value);
    }
  };

  renderLiveSearch = () => {
    const { loading } = this.state;
    let xhtml = null;
    xhtml = <LiveSearchContainer data={this.state.data}></LiveSearchContainer>;
    if (loading) {
      return xhtml;
    } else {
      return false;
    }
  };
  render() {
    return (
      <div id="header">
        <div className="container">
          <div className="row">
            <div
              className=" col-md-5"
              onMouseLeave={() => this.setState({ isLeave: true })}
              onMouseMove={() => this.setState({ isLeave: false })}
            >
              <form className="form-inline">
                <div className="form-group">
                  <input
                    name="tenhh"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Bạn tìm gì..."
                    className="form-control"
                    autoComplete="off"
                  />
                  <button type="button" className="btn btn-default">
                    <i className="fa fa-search" />
                  </button>
                </div>
              </form>
              <div>{this.state.isLeave ? null : this.renderLiveSearch()}</div>
            </div>
            <div className="col-md-4">
              <Link to="/">
                <img src="/images/logo_3.png" alt="" />
              </Link>
            </div>
            <div className="col-md-3">
              <div className="pull-left">
                <i className="fa fa-phone" />
              </div>
              <div className="pull-right">
                <p className="phone">ĐẶT ỐP LƯNG</p>
                <a href="tel:0386580528">038.658.0528</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
