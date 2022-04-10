import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { xemChiTietDatHang, capNhatDH } from "../actions";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Hoadon(props) {
  const chiTietDatHang = useSelector((state) => state.chiTietDatHang);
  const { loading, chiTietDH, error } = chiTietDatHang;
  const dispatch = useDispatch();
  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;
  const dh_id = props.match.params.dh_id;

  useEffect(() => {
    dispatch(xemChiTietDatHang(dh_id));
  }, []);

  // Lay so luong san pham
  const [loadingPrs, setLoadingPrs] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    if (userInfo) {
      const fetchOrderDetail = async () => {
        setLoadingPrs(true);
        const res = await axios.get(`/orderdetail/${dh_id}`);
        setLoadingPrs(false);
        setOrderDetail(res.data);
      };
      fetchOrderDetail();
    } else {
      props.history.push("/");
    }
  }, [dh_id]);

  const [trangthai, setTrangThai] = useState();
  // const capNhatDH = useSelector((state) => state.capNhatDH);
  const handleSubmit = async (e) => {
    var tt = "";
    //lấy tt đầu tiên là "đã xác nhận"
    if (!trangthai) {
      tt = "Đã xác nhận";
    } else {
      tt = trangthai;
    }
    e.preventDefault();
    const info = {
      dh_id,
      trangthai: tt,
      nv_id: userInfo.id,
    };
    dispatch(capNhatDH(info));
    console.log(info);

    props.history.push(`/orderlisting`);
    window.location.reload();
  };

  return loading ? (
    <div className="container">Loading...</div>
  ) : (
    <div id="order-detail-wrapper">
      <div
        id="order-detail"
        className="main-content"
        style={{ width: "500px" }}
      >
        <h1 style={{ textAlign: "center", backgroundColor: "black" }}>
          Hóa đơn
        </h1>
        <label>Người nhận: </label>
        <span>{`${chiTietDH[0].HoTen}`}</span>
        <br />
        <label>Điện thoại: </label>
        <span> {`${chiTietDH[0].sdt}`}</span>
        <br />
        <label>Địa chỉ: </label>
        <span> {`${chiTietDH[0].DiaChi}`}</span>
        <h3>Danh sách sản phẩm</h3>
        <ul>
          {loadingPrs ? (
            <div>Loading...</div>
          ) : (
            <>
              {orderDetail.map((order) => (
                <li>
                  <span className="item-name">{order.tenhh}</span>
                  <span className="item-quantity">
                    {" "}
                    - SL: {order.soluong} sản phẩm
                  </span>
                </li>
              ))}
            </>
          )}
        </ul>
        <hr />
        <label>Tổng tiền:</label>{" "}
        {`${chiTietDH[0].tonggia.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}`}
        <hr />
      </div>
    </div>
  );
}

export default Hoadon;
