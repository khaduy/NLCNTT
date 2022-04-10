import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function OrderListing(props) {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;
  const totalPagesCalculate = (arrLength) => {
    const totalP = [];
    for (let i = 1; i <= Math.ceil(arrLength / 8); i++) {
      totalP.push(i);
    }
    setTotalPages(totalP);
  };
  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await axios.get(`/orderlisting`);
    setLoading(false);
    setOrders(data);
    totalPagesCalculate(data.length);
  };
  useEffect(() => {
    if(userInfo){
      fetchOrders();
    }else{
      props.history.push("/");
    }
    
  }, []);

  //=== Pagination
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

  return loading ? (
    <div className="container">Loading...</div>
  ) : (
    <div className="main-content">
      <h1 style={{ textAlign: "center" }}>Danh sách đơn hàng</h1>
      <div className="product-items">
        <table>
          <tbody>
            <tr>
              <th>
                <div className="product-prop product-sdt">Số điện thoại</div>
              </th>
              <th>
                <div className="product-prop product-name">
                  Họ tên khách hàng
                </div>
              </th>
              <th>
                <div
                  className="product-prop product-id"
                  style={{ width: "70px" }}
                >
                  MSNV
                </div>
              </th>
              <th>
                <div
                  className="product-prop product-right"
                  style={{ width: "280px" }}
                >
                  Địa chỉ giao hàng
                </div>
              </th>
              <th>
                <div
                  className="product-prop product-right"
                  style={{ width: "250px" }}
                >
                  Ghi chú
                </div>
              </th>
              <th>
                <div className="product-prop product-price">Tổng giá</div>
              </th>
              <th>
                <div
                  className="product-prop product-right"
                  style={{ width: "220px" }}
                >
                  Ngày đặt hàng
                </div>
              </th>
              <th>
                <div
                  className="product-prop product-right"
                  style={{ width: "120px" }}
                >
                  Trạng thái
                </div>
              </th>
              <th>
                <div
                  className="product-prop product-button"
                  style={{ width: "80px" }}
                >
                  Chi tiết
                </div>
              </th>
              <th>
                <div
                  className="product-prop product-button"
                  style={{ width: "80px" }}
                >
                  In
                </div>
              </th>
            </tr>
            {filterOrders(orders).map((order) => (
              <tr>
                <th>
                  <div className="product-prop product-sdt">{order.sdt}</div>
                </th>
                <th>
                  <div className="product-prop product-name">{order.HoTen}</div>
                </th>
                <th>
                  <div
                    className="product-prop product-id"
                    style={{ width: "70px" }}
                  >
                    {order.nv_id}
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
                  <div className="product-prop product-note">
                    {order.chuthich}
                  </div>
                </th>
                <th>
                  <div className="product-prop product-price">
                    {order.tonggia.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                </th>
                <th>
                  <div
                    className="product-prop product-right"
                    style={{ width: "220px" }}
                  >
                    {order.ngaydh}
                  </div>
                </th>
                <th>
                  <div
                    className="product-prop product-right"
                    style={{ width: "120px", color: "red" }}
                  >
                    {order.trangthai}
                  </div>
                </th>
                <th>
                  <div
                    className="product-prop product-button"
                    style={{ width: "80px" }}
                  >
                    <Link to={`/orderdetail/${order.dh_id}`}>Chi tiết</Link>
                  </div>
                </th>
                <th>
                  <div
                    className="product-prop product-button"
                    style={{ width: "80px" }}
                  >
                    <a href={`/hoadon/${order.dh_id}`} target="_blank">In</a>
                  </div>
                </th>
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
  
  );
}

export default OrderListing;
