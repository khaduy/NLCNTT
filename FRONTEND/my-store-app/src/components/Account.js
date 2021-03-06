import {
  Breadcrumbs,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  breadcrumb: {
    padding: 10,
  },
}));

const styles = {
  h1a: {
    color: "blue",
    textAlign: "center",
  },
};

function Account(props) {
  const [profileStatus, setProfileStatus] = useState(false);
  const [orderStatus, setOrderStatus] = useState(false);
  const classes = useStyle();

  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;
  const dispatch = useDispatch();

  const changeProfileStatus = () => {
    setOrderStatus(false);
    setProfileStatus(true);
  };
  const changeOrderStatus = () => {
    setOrderStatus(true);
    setProfileStatus(false);
  };
  const [donHang, setDonHang] = useState([]);
  const renderForm = () => {
    if (profileStatus) {
      // return <Profile userInfo={userInfo} userInfo2={data}></Profile>;
    } else if (orderStatus) {
      // return <Order></Order>;
    } else {
      return false;
    }
  };

  const getDonHang = async () => {
    var don = [];
    if (userInfo) {
      const { data } = await axios.get(`/orderlisting`);
      console.log(data);
      if (data) {
        data.map((v) => {
          if (v.sdt == userInfo.sdt) {
            don.push(v);
          }
        });
      }
    }
    console.log(don);
    setDonHang(don);
  };

  useEffect(() => {
    // dispatch(layThongTin(userInfo.userid));
  }, [dispatch]);
  const account = useSelector((state) => state.account);
  // const { data } = account;
  const Logout = () => {
    // dispatch({ type: DANG_XUAT });
  };

  useEffect(() => {
    if (!userInfo) {
      props.history.push("/");
    }
    getDonHang();
  }, [userInfo]);

  const { page = 1 } = useParams();
  const filterOrders = (ordersList) => {
    const firstParam = (page || 1) * 8 - 8;
    const secondParam = (page || 1) * 8;
    return ordersList.slice(firstParam, secondParam);
  };

  const prevPage = (num) => {
    let myNum = Number(num);
    if (myNum === 1) {
      return "1";
    } else if (myNum > 1 && myNum <= totalPages.length) {
      return (myNum = myNum - 1);
    }
  };

  const nextPage = (num) => {
    let myNum = Number(num);
    if (myNum === totalPages.length) {
      return totalPages.length;
    } else if (myNum < totalPages.length) {
      return (myNum = myNum + 1);
    }
  };
  return (
    <div id="login-notify" className="box-content">
      <div style={{ margin: "30px 0" }}>
        {userInfo ? (
          <div style={{ textAlign: "center" }}>
            <h1 style={styles.h1a}>Ch??o m???ng b???n ?????n trang c?? nh??n</h1>
            <h2 style={{ textAlign: "center" }}>H??? v?? t??n: {userInfo.hoten}</h2>
            <h2 style={{ textAlign: "center" }}>S???? ??i????n thoa??i: {userInfo.sdt}</h2>
            <h2 style={{ textAlign: "center" }}>??i??a chi??: {userInfo.diachi}</h2>
            <h2 style={{ textAlign: "center" }}>Email: {userInfo.email}</h2>
            <br />
          </div>
        ) : null}
      </div>
      <div className="main-content">
        <h1 style={{ textAlign: "center" }}>Danh s??ch ????n h??ng</h1>
        <div className="product-items" style={{ width: "1460px", margin: "auto" }}>
          <table style={{ width: "1390px", margin: "auto" }}>
            <tbody className="cart-table">
              <tr className="row1">
                <th>
                  <div className="total-money">S??? ??i???n tho???i</div>
                </th>
                <th>
                  <div className="total-money">H??? t??n</div>
                </th>
                <th>
                  <div
                    className="product-prop product-right"
                    style={{ width: "280px" }}
                  >
                    ?????a ch??? giao h??ng
                  </div>
                </th>
                <th>
                  <div
                    className="product-prop product-right"
                    style={{ width: "250px" }}
                  >
                    Ghi ch??
                  </div>
                </th>
                <th>
                  <div className="total-money">T???ng gi??</div>
                </th>
                <th>
                  <div
                    className="total-money"
                    style={{ width: "220px" }}
                  >
                    Ng??y ?????t h??ng
                  </div>
                </th>
                <th>
                  <div
                    className="total-money"
                    style={{ width: "120px" }}
                  >
                    Tr???ng th??i
                  </div>
                </th>
                {/* <th>
                  <div
                    className="product-prop product-button"
                    style={{ width: "80px" }}
                  >
                    Chi ti???t
                  </div>
                </th> */}
              </tr>
              {filterOrders(donHang).map((order) => (
                <tr>
                  <th>
                    <div className="total-money">{order.sdt}</div>
                  </th>
                  <th>
                    <div className="product-prop product-name">
                      {order.HoTen}
                    </div>
                  </th>
                  <th>
                    <div
                      className="product-prop product-right"
                      style={{ width: "280px" }}
                    >
                      {order.DiaChi}
                    </div>
                  </th>
                  <th>
                    <div className="total-money">
                      {order.chuthich}
                    </div>
                  </th>
                  <th>
                    <div className="total-money">
                      {order.tonggia.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                  </th>
                  <th>
                    <div
                      className="total-money"
                      style={{ width: "220px" }}
                    >
                      {order.ngaydh}
                    </div>
                  </th>
                  <th>
                    <div
                      className="total-money"
                      style={{ width: "120px", color: "red" }}
                    >
                      {order.trangthai}
                    </div>
                  </th>
                  {/* <th>
                    <div
                      className="product-prop product-button"
                      style={{ width: "80px" }}
                    >
                      <Link to={`/orderdetail/${order.dh_id}`}>Chi ti???t</Link>
                    </div>
                  </th> */}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="clear-both" />
        </div>
        <div className="pagination1">
          <ul>
            <li>
              <Link to={`/orderlisting/page/${prevPage(page)}`}>Prev</Link>
            </li>
            {totalPages.map((item) => (
              <li className={item === Number(page) ? "active" : ""}>
                <Link to={`/orderlisting/page/${item}`}>{item}</Link>
              </li>
            ))}

            <li>
              <Link to={`/orderlisting/page/${nextPage(page)}`}>Next</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Account;
