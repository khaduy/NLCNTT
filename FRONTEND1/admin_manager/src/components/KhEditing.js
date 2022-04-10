import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { capNhatMKKH } from "../actions";
import axios from "axios";

function KhEditing(props) {
  const dispatch = useDispatch();
  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;
  const sdt = props.match.params.sdt;

  // Lay so luong san pham
  const [loadingKh, setLoadingKh] = useState(false);
  const [Kh, setKh] = useState([]);

  useEffect(() => {
    if (userInfo) {
      const fetchKh = async () => {
        setLoadingKh(true);
        const res = await axios.get(`/khediting/${sdt}`);
        setLoadingKh(false);
        setKh(res.data);
      };
      fetchKh();
    } else {
      props.history.push("/");
    }
  }, [sdt]);

  const [pass, setPass] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const info = {
      sdt,
      pass,
    };
    dispatch(capNhatMKKH(info));
    console.log(info);

    props.history.push(`/khlisting`);
    window.location.reload();
  };
  return loadingKh ? (
    <div>Loading...</div>
  ) : (
    <>
      {Kh.map((kh) => (
        <div className="form-text" >
          <form className="main-content uedit" onSubmit={handleSubmit}>
            <h1 style={{ textAlign: "center" }}>Sửa khách hàng {kh.hoten}</h1>
            <br />
            <label>Mật khẩu:</label> <br />
            <input
              type="text"
              name="pass"
              size={30}
              onChange={(e) => setPass(e.target.value)}
              required
            />{" "}
            <br /> <br />
            <input type="submit" defaultValue="Submit" />
            <input type="reset" defaultValue="Reset" />
            <br />
            <br />
          </form>
        </div>
      ))}
    </>
  );
}

export default KhEditing;
