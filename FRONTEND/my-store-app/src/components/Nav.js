import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DANG_XUAT } from "../constants";

function Nav() {
  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;

  const dispatch = useDispatch();
  const dangXuat = () => {
    dispatch({ type: DANG_XUAT });
  };

  return (
    <div id="menunav">
      <div className="container">
        <nav>
          <ul className="menu-main" style={{ marginLeft: "-40px" }}>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <div className="dropdown">
                <button className="dropbtn" disabled>
                  Hãng điện thoại
                </button>
                <div className="dropdown-content">
                  <Link to="/category/10000">Apple</Link>
                  <Link to="/category/20000">Samsung</Link>
                  <Link to="/category/30000">Oppo</Link>
                  <Link to="/category/40000">Realme</Link>
                  <Link to="/category/50000">Xiaomi</Link>
                </div>
              </div>
            </li>
            <li>
              <Link to="/category/90000">Phụ kiện </Link>
            </li>
            <li>
              <Link to="/chinhsachdoitra">Chính sách đổi trả </Link>
            </li>
            <li>
              <Link to="/chinhsachgiaohang">Chính sách giao hàng </Link>
            </li>
            <li>
              <Link to="/giohang">Quản lý giỏ hàng </Link>
            </li>
          </ul>
          {/* menu-main */}
          {/* <ul className="menu-main">
                    <li>
                    <div className="dropdown">
                        <button className="dropbtn" disabled>Hãng điện thoại</button>
                        <div className="dropdown-content">
                        <a href="category.php?id=10000">Apple</a>
                        <a href="category.php?id=20000">Samsung</a>
                        <a href="category.php?id=30000">Oppo</a>
                        <a href="category.php?id=40000">Realme</a>
                        <a href="category.php?id=50000">Xiaomi</a>
                        </div>
                    </div>
                    </li>
                    <li>
                    <a href="category.php?id=90000">Phụ kiện</a>
                    </li>
                    <li>
                    <a href="/chinhsachdoi">Chính sách đổi trả</a>
                    </li>
                    <li>
                    <a href="chinhsachgiaohang.php">Chính sách giao hàng</a>
                    </li>
                    <li>
                    <a href="cart.php">Quản lý giỏ hàng</a>
                    </li>
                </ul> */}
          {/* end menu-main */}
          {/* dndk */}
          <ul className="pull-right" id="dndk">
            <div id="dndk1">
              <li>
                {userInfo ? (
                  <>
                    <Link to="/account">Xin chào: {userInfo.hoten}</Link>
                    <Link to="/" onClick={dangXuat}>
                      Đăng xuất{" "}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/dangnhap">Đăng nhập </Link>
                    <Link to="/dangky">Đăng ký </Link>
                  </>
                )}
              </li>
            </div>
          </ul>
          {/* end dndk */}
        </nav>
      </div>
    </div>
  );
}

export default Nav;
