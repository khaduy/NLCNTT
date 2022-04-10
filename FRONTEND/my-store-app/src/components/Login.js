import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dangNhapKhangHang } from "../actions";

const styles = {
  tabledndk:{
    borderCollapse: 'none',
    width: 'auto',
    border: '1px',
    backgroundImage: 'none',
  }
}


function Login(props) {
  const [sdt, setSdt] = useState("");
  const [pass, setPass] = useState("");

  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch: tên action
    dispatch(dangNhapKhangHang(sdt, pass));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
  }, [userInfo]);

  return (
    <div className="loginout">
      <h1>Trang đăng nhập</h1>
      <div className="thongtin">
        <form onSubmit={handleSubmit}>
          <table style={styles.tabledndk}>
            <tbody>
              <tr>
                <td>Nhập số điện thoại</td>
                <td>
                  <input
                    onChange={(e) => setSdt(e.target.value)}
                    type="text"
                    className="form-control"
                    value={sdt}
                    name="sdt"
                    id="sdt"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Nhập mật khẩu</td>
                <td>
                  <input
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    className="form-control"
                    value={pass}
                    name="pass"
                    id="pass"
                    required
                  />
                </td>
              </tr>
              <tr className="submit">
                <td colSpan={2} align="center">
                  <button type="submit" className="btn btn-info">
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
          <Link to="/dangky">Chưa có tài khoản? Hãy đăng ký tại đây!!!</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
