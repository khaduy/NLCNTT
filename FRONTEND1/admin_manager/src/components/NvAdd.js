import React, { Component } from "react";
import axios from "axios";

const addadmin = (usernames, fullname, passwords, create_time) =>
  axios
    .post("/nvadd", { usernames, fullname, passwords, create_time })
    .then((resp) => resp.data);

class NvAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernames: "",
      fullname: "",
      passwords: "",
      create_time: new Date().toLocaleString(),
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
    var { usernames, fullname, passwords, create_time } = this.state;
    addadmin(usernames, fullname, passwords, create_time).then((response) => {
      console.log(response);
    });
    alert("Bạn đã đăng ký thành công!!!");
  };

  render() {
    return (
      <div className="form-text main-content uedit">
        <h1 style={{ textAlign: "center" }}>Thêm nhân viên</h1>
        <br />
        <form>
          <label>Chức vụ:</label> <br />
          <input
            type="text"
            name="usernames"
            size={30}
            onChange={(event) => this.isChange(event)}
          />
          <br />
          <br />
          <label>Tên nhân viên:</label> <br />
          <input
            type="text"
            name="fullname"
            size={30}
            onChange={(event) => this.isChange(event)}
          />
          <br />
          <br />
          <label>Mật khẩu:</label> <br />
          <input
            type="password"
            name="passwords"
            size={30}
            onChange={(event) => this.isChange(event)}
          />
          <br />
          <br />
          <input
            type="submit"
            defaultValue="Submit"
            onClick={() => this.handleClick()}
          />
          <input type="reset" defaultValue="Reset" />
        </form>
        <br />
      </div>
    );
  }
}

export default NvAdd;
