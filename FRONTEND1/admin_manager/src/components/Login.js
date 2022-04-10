import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dangNhapAdmin } from "../actions";

function Login(props) {
  const [usernames, setUsername] = useState("");
  const [passwords, setPassword] = useState("");

  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch: tên action
    dispatch(dangNhapAdmin(usernames, passwords));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
      // window.location.reload();
    }
  }, [userInfo]);

  return (
    <div id="user_login" className="box-content">
      <h1>Đăng nhập tài khoản</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <br />
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" defaultValue="Đăng nhập" />
      </form>
    </div>
  );
}

export default Login;
