import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const data02 = (sdt, pass) =>
  axios.post("/data02", { sdt, pass }).then((resp) => resp.data);

class Dangnhap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sdt: "",
      pass: "",
    };
  }
  isChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  handleClick = () => {
    console.log(JSON.stringify(this.state));
    var { sdt, pass } = this.state;
    data02(sdt, pass).then((response) => {
      console.log(response);
    });
    // alert('So Dien Thoai la ' + this.state.sdt + ' Password is ' + this.state.pass);
  };
  render() {
    return (
      <div>
        <div className="loginout">
          <h1>Trang đăng nhập</h1>
          <div className="thongtin">
            <form>
              <table className="tabledndk">
                <tbody>
                  <tr>
                    <td>Nhập số điện thoại</td>
                    <td>
                      <input
                        onChange={(event) => this.isChange(event)}
                        type="text"
                        className="form-control"
                        name="sdt"
                        id="sdt"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Nhập mật khẩu</td>
                    <td>
                      <input
                        onChange={(event) => this.isChange(event)}
                        type="password"
                        className="form-control"
                        name="pass"
                        id="pass"
                      />
                    </td>
                  </tr>
                  <tr className="submit">
                    <td colSpan={2} align="center">
                      <button
                        type="reset"
                        onClick={() => this.handleClick()}
                        className="btn btn-info"
                      >
                        Đăng nhập
                      </button>
                      <button type="reset" className="btn btn-info">
                        Làm lại
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
            <p>
              <Link to="/dangky">
                Chưa có tài khoản? Hãy đăng ký tại đây!!!
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Dangnhap;
