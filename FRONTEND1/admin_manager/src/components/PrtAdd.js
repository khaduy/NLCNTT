import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { themSp } from "../actions";
import axios from "axios";

function PrtAdd(props) {
  const dispatch = useDispatch();
  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;

  // Lay so luong san pham
  const [loadingGr, setLoadingGr] = useState(false);
  const [gr, setGr] = useState([]);

  useEffect(() => {
    if (userInfo) {
      const fetchGr = async () => {
        setLoadingGr(true);
        const res = await axios.get(`/categories`);
        setLoadingGr(false);
        setGr(res.data);
      };
      fetchGr();
    } else {
      props.history.push("/");
    }
  }, []);

  const [mshh, setMshh] = useState();
  const [tenhh, setTenhh] = useState();
  const [gia, setGia] = useState();
  const [soluong, setSoLuong] = useState();
  const [manhom, setMaNhom] = useState();
  const [hinh, setHinh] = useState();
  const [motahh, setMoTaHH] = useState();
  // const capNhatDH = useSelector((state) => state.capNhatDH);
  const handleSubmit = async (e) => {
    var mn = "";
    //lấy tt đầu tiên là "đã xác nhận"
    if (!manhom) {
      mn = "10000";
    } else {
      mn = manhom;
    }
    e.preventDefault();
    const info = {
      mshh,
      tenhh,
      gia,
      soluong,
      mn,
      hinh,
      motahh,
      mahh : null
    };
    dispatch(themSp(info));
    console.log(info);

    props.history.push(`/prslisting`);
    window.location.reload();
  };
  return loadingGr ? (
    <div>Loading...</div>
  ) : (
    <div className="form-text main-content uedit">
      <h1 style={{ textAlign: "center" }}>Thêm sản phẩm</h1>
      <form onSubmit={handleSubmit}>
        <label>Mã sản phẩm:</label> <br />
        <input
          type="text"
          name="mshh"
          size={30}
          onChange={(e) => setMshh(e.target.value)}
        />
        <br />
        <br />
        <label>Tên sản phẩm:</label> <br />
        <input
          type="text"
          name="tenhh"
          size={30}
          onChange={(e) => setTenhh(e.target.value)}
        />
        <br />
        <br />
        <label>Giá:</label> <br />
        <input
          type="number"
          name="gia"
          size={30}
          onChange={(e) => setGia(e.target.value)}
        />
        <br />
        <br />
        <label>Số lượng:</label> <br />
        <input
          type="number"
          name="soluong"
          size={30}
          onChange={(e) => setSoLuong(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="manhom">Mã nhóm hàng hóa: </label>
        <select
          name="manhom"
          id="manhom"
          onChange={(e) => setMaNhom(e.target.value)}
        >
          {gr.map((gr) => (
            <option>{gr.manhom}</option>
          ))}
        </select>
        <br />
        <br />
        <label>Link hình:</label> <br />
        <input
          type="text"
          name="hinh"
          size={30}
          onChange={(e) => setHinh(e.target.value)}
        />
        <br />
        <br />
        <label>Mô tả hàng hóa:</label> <br />
        <input
          type="text"
          name="motahh"
          size={30}
          onChange={(e) => setMoTaHH(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" defaultValue="Submit" />
        <input type="reset" defaultValue="Reset" />
      </form>
      <br />
    </div>
  );
}

export default PrtAdd;

