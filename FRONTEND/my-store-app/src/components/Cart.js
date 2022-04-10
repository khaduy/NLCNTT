import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { luuDathang, resetGioHang, themGioHang, xoaGioHang } from "../actions";
import {
  DAT_HANG_RESET,
  GIAM_SO_LUONG_SP,
  GIO_HANG_RESET,
  TANG_SO_LUONG_SP,
} from "../constants";
import "./css/Cart.css";
function Cart(props) {
  const [chuThich, setChuThich] = useState("");
  const [hoTen, setHoTen] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const themHangVaoGio = useSelector((state) => state.themHangVaoGio);
  const { dsGioHang } = themHangVaoGio;

  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;
  const dathang = useSelector((state) => state.dathang);
  const { loading, error, successMsg } = dathang;

  // Khi component render xong, kiểm tra liển coi biến userInfo tồn tại chưa, nếu chưa => chưa đăng nhập, thảy qua trang ĐN
  useEffect(() => {
    if (!userInfo) {
      props.history.push("/dangnhap");
    }
  }, [userInfo, props.history]);

  const qty = props.location.search.split("=")[1];
  const mshh = props.match.params.mshh;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(themGioHang(mshh, qty));
  }, [mshh, qty]);

  const tinhTongGia = (dsSanpham) => {
    const total = dsSanpham.reduce(
      (accumulator, item) => accumulator + item.gia * item.soluongmua,
      0
    );
    return total;
  };

  //console.log(tinhTongGia(dsGioHang));

  const xoaSanPham = (mshh) => {
    dispatch(xoaGioHang(mshh));
  };

  //========================================================

  const tangSLSanPham = (mshh) => {
    dispatch({ type: TANG_SO_LUONG_SP, payload: mshh });
    localStorage.setItem("dsGioHang", JSON.stringify(dsGioHang));
    // Xong !!!
  };
  const giamSLSanPham = (mshh, soluongmua) => {
    dispatch({ type: GIAM_SO_LUONG_SP, payload: { mshh, soluongmua } });
    localStorage.setItem("dsGioHang", JSON.stringify(dsGioHang));
    // Xong !!!
  };

  const handleDatHang = (e) => {
    e.preventDefault();

    // Kiem tra gio hang co san pham ko, co thi moi cho dat hang
    if (!dsGioHang.length) {
      return alert("Không có sản phẩm nào trong giỏ!");
    }

    var hoten = "";
    var diachi = "";

    if(hoTen == ""){
      hoten = userInfo.hoten;
    }else{
      hoten = hoTen;
    }
    if(diaChi == ""){
      diachi = userInfo.diachi;
    }else{
      diachi = diaChi;
    }

    const data = {
      // dh_id: 11,
      HoTen: hoten,
      DiaChi: diachi,
      chuthich: chuThich,
      tonggia: tinhTongGia(dsGioHang),
      NgayDH: new Date().toLocaleString(),
      sdt: userInfo.sdt,
      trangthai: "Chờ xác nhận",
      dsGioHang,
    };
    dispatch(luuDathang(data));
  };

  useEffect(() => {
    if (successMsg) {
      alert(successMsg.message);
      dispatch({ type: DAT_HANG_RESET });
      // xoa gio hang hien tai
      dispatch(resetGioHang());
    }
  }, [successMsg]);

  return (
    <div className="container-cart">
      {/* <h1 class="cart-title"><i class="fa fa-shopping-cart"></i> Giỏ hàng của bạn:</h1> */}

      <table className="cart-table">
        <thead>
          <tr className="row1">
            <th className="product-number">STT</th>
            <th className="product-name">Tên sản phẩm</th>
            <th className="product-img">Ảnh sản phẩm</th>
            <th className="product-price" style={{ color: "#333333" }}>
              Đơn giá
            </th>
            <th className="product-quantity">Số lượng</th>
            <th className="total-money">Thành tiền</th>
            <th className="product-delete">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {dsGioHang && dsGioHang.length ? (
            dsGioHang.map((item) => (
              <tr>
                <td className="product-number">1</td>
                <td className="product-name name-product">
                  {item && item.tenhh}
                </td>
                <td className="product-img">
                  <img src={item && `/${item.hinh}`} />
                </td>
                <td className="product-price">
                  {item &&
                    item.gia.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  .
                </td>
                <td className="product-quantity">
                  <button
                    onClick={() => giamSLSanPham(item.mshh, item.soluongmua)}
                  >
                    -
                  </button>
                  <input
                    type="name"
                    value={item && item.soluongmua}
                    name="quantity[10001]"
                    min={1}
                    max={97}
                  />
                  <button
                    onClick={() => tangSLSanPham(item.mshh, item.soluongmua)}
                  >
                    +
                  </button>
                </td>

                <td className="total-money">
                  {item &&
                    (item.gia * item.soluongmua).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                </td>
                <td className="product-delete">
                  <a href="#" onClick={() => xoaSanPham(item.mshh)}>
                    <i className="fa fa-remove" />
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="cart___no__item" colSpan="7">
                Không có sản phẩm nào trong giỏ hàng
              </td>
            </tr>
          )}
        </tbody>
        <tr id="row-total">
          <td className="product-number">&nbsp;</td>
          <td className="product-name" style={{ fontSize: "17px" }}>
            Tổng tiền
          </td>
          <td className="product-img">&nbsp;</td>
          <td className="product-price">&nbsp;</td>
          <td className="product-quantity">&nbsp;</td>
          <td
            className="total-money"
            style={{ fontWeight: "bold", fontSize: "20px", color: "#bf081f" }}
          >
            {tinhTongGia(dsGioHang).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </td>
          <td className="product-delete" />
        </tr>
      </table>
      {/* {dsGioHang.length && (
          <div id="form-button">
            <button
              type="submit"
              className="btn-grad1"
              name="update_click"
              value="Cập nhật"
            >
              <i className="fa fa-pencil-square-o" /> Cập nhật{" "}
            </button>
          </div>
        )} */}
      <hr />
      <form onSubmit={handleDatHang}>
        <div className="ttkh">
          <div className="row">
            <div
              className="col-md-12"
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Thông tin khách hàng
            </div>
            <div className="col-md-7">
              <label
                style={{
                  marginTop: "15px",
                  width: "100px",
                  display: "inline-block",
                }}
              >
                Điện thoại:{" "}
              </label>
              {userInfo && userInfo.sdt}
              <input type="hidden" name="phone" disabled />
            </div>
            <div className="col-md-5">
              <label
                style={{
                  width: "100px",
                  display: "inline-block",
                  marginTop: "15px",
                }}
              >
                Người nhận:{" "}
              </label>
              <input
                type="text"
                name="name"
                defaultValue={userInfo && userInfo.hoten}
                onChange={(e) => setHoTen(e.target.value)}
              />
            </div>
            <div className="col-md-7">
              <label
                className="col-md-3"
                style={{
                  width: "100px",
                  display: "inline-block",
                  paddingLeft: 0,
                  marginTop: "15px",
                }}
              >
                Ghi chú:
              </label>
              <textarea
                name="note"
                cols={35}
                rows={5}
                value={chuThich}
                onChange={(e) => setChuThich(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <label
                style={{
                  width: "100px",
                  display: "inline-block",
                  marginTop: "15px",
                }}
              >
                Địa chỉ:{" "}
              </label>
              <input
                type="text"
                name="address"
                defaultValue={userInfo && userInfo.diachi}
                onChange={(e) => setDiaChi(e.target.value)}
              />
            </div>
          </div>
        </div>
        {error && <div>{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <input
            type="submit"
            name="order_click"
            className="btn-grad2"
            value="Đặt hàng"
          />
        )}
      </form>
    </div>
  );
}

export default Cart;
