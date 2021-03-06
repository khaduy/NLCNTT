import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { capNhatSP } from "../actions";
import axios from "axios";

function PrsEditing(props) {
  const dispatch = useDispatch();
  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;
  const mshh = props.match.params.mshh;

  const [loadingSp, setLoadingSp] = useState(false);
  const [Sp, setSp] = useState([]);

  useEffect(() => {
    if (userInfo) {
      const fetchSp = async () => {
        setLoadingSp(true);
        const res = await axios.get(`/spediting/${mshh}`);
        setLoadingSp(false);
        setSp(res.data);
      };
      fetchSp();
    } else {
      props.history.push("/");
    }
  }, [mshh]);
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

  const [mahh, setMshh] = useState();
  const [tenhh, setTenhh] = useState();
  const [gia, setGia] = useState();
  const [soluong, setSoLuong] = useState();
  const [manhom, setMaNhom] = useState();
  const [hinh, setHinh] = useState();
  const [motahh, setMoTaHH] = useState();
  const handleSubmit = async (e) => {
    var mn = "";
    if (!manhom) {
      mn = "10000";
    } else {
      mn = manhom;
    }
    e.preventDefault();
    const info = {
      mshh : mahh? mahh : Sp[0].mshh,
      mahh : mahh? mahh : Sp[0].mshh,
      tenhh : tenhh? tenhh : Sp[0].tenhh,
      gia : gia? Number(gia) : Number(Sp[0].gia),
      soluong : soluong? Number(soluong) : Number(Sp[0].soluonghang),
      mn : mn? Number(mn) : Number(Sp[0].manhom),
      hinh : hinh? hinh : Sp[0].hinh,
      motahh : motahh? motahh : Sp[0].motahh,
    };
    const { data } = await axios.post("/add", info);
    console.log(info);
    props.history.push(`/prslisting`);
    window.location.reload();
  };
  
  return loadingSp ? (
    <div>Loading...</div>
  ) : (
    <>
      {Sp.map((sp) => (
        <div className="form-text main-content uedit">
          <h1 style={{ textAlign: "center" }}>S????a s???n ph???m</h1>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <label>M?? s???n ph???m:</label> <br />
            <input
              type="text"
              name="mshh"
              size={30}
              defaultValue={sp.mshh}
              onChange={(e) => setMshh(e.target.value)}
            />
            <br />
            <br />
            <label>T??n s???n ph???m:</label> <br />
            <input
              type="text"
              name="tenhh"
              size={30}
              defaultValue={sp.tenhh}
              onChange={(e) => setTenhh(e.target.value)}
            />
            <br />
            <br />
            <label>Gi??:</label> <br />
            <input
              type="text"
              name="gia"
              size={30}
              defaultValue={sp.gia}
              onChange={(e) => setGia(e.target.value)}
            />
            <br />
            <br />
            <label>S??? l?????ng:</label> <br />
            <input
              type="text"
              name="soluong"
              size={30}
              defaultValue={sp.soluonghang}
              onChange={(e) => setSoLuong(e.target.value)}
            />
            <br />
            <br />
            {loadingGr ? (
              <div>Loading...</div>
            ) : (
              <>
            <label htmlFor="manhom">M?? nh??m h??ng h??a: </label>
            <select
              name="manhom"
              id="manhom"
              onChange={(e) => setMaNhom(e.target.value)}
            >
              {gr.map((gr) => (
                <option>{gr.manhom}</option>
              ))}
            </select>
            </>
            )}
            <br />
            <br />
            <label>H??nh:</label> <br />
            <input
              type="text"
              name="hinh"
              size={30}
              defaultValue={sp.hinh}
              onChange={(e) => setHinh(e.target.value)}
            />
            <br />
            <br />
            <label>M?? ta?? ha??ng ho??a:</label> <br />
            <input
              type="text"
              name="soluong"
              size={30}
              defaultValue={sp.motahh}
              onChange={(e) => setMoTaHH(e.target.value)}
            />
            <br />
            <br />
            <input type="submit" defaultValue="Submit" />
            <input type="reset" defaultValue="Reset" />
          </form>
          <br />
        </div>
      ))}
    </>
  );
}

export default PrsEditing;
