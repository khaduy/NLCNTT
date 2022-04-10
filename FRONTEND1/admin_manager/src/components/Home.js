import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DANG_XUAT } from "../constants";

const styles = {
  h1a: {
    color: "blue",
  },
};

function Home() {
  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;
  const dispatch = useDispatch();
  const dangXuat = () => {
    dispatch({ type: DANG_XUAT });
  };
  return (
    <div id="login-notify" className="box-content">
      {userInfo ? (
        <>
          <h1 style={styles.h1a}>Chào mừng bạn đến trang quản trị</h1>
          <h1 style={styles.h1b}>Họ và tên: {userInfo.fullname}</h1>

          <h3>Mã nhân viên: {userInfo.id}</h3>
          <h3>Chức vụ: {userInfo.username}</h3>
          <h3>Ngày tạo tài khoản: {userInfo.created_time}</h3>
          <Link to="/dangnhap" onClick={dangXuat}>
            Đăng xuất{" "}
          </Link>
        </>
      ) : (
        <>
          <h1>Vui lòng đăng nhập</h1>
          <Link to="/dangnhap">Đăng nhập </Link>
        </>
      )}
    </div>
  );
}

export default Home;
