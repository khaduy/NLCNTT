import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { capNhatTTNV } from "../actions";
import axios from "axios";

function NvEditing(props) {
  const dispatch = useDispatch();
  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;
  const id = props.match.params.id;

  const [loadingNv, setLoadingNv] = useState(false);
  const [Nv, setNv] = useState([]);

  useEffect(() => {
    if (userInfo) {
      const fetchNv = async () => {
        setLoadingNv(true);
        const res = await axios.get(`/nvediting/${id}`);
        setLoadingNv(false);
        setNv(res.data);
      };
      fetchNv();
    } else {
      props.history.push("/");
    }
  }, [id]);

  const [fullname, setFullname] = useState();
  const [passwords, setPasswords] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const info = {
      id,
      fullname,
      passwords,
    };
    dispatch(capNhatTTNV(info));
    console.log(info);

    
    var userCurrent = localStorage.getItem("userInfo")
    userCurrent = JSON.parse(userCurrent);
    if(id == userCurrent.userInfo.id){
      let user = {
        id : id,
        fullname : fullname,
        passwords : passwords,
        username : userCurrent.userInfo.username
      }
      localStorage.removeItem("userInfo");
      localStorage.setItem("userInfo",JSON.stringify({userInfo : info}))
    }
    props.history.push(`/nvlisting`);
    window.location.reload();
  };
  return loadingNv ? (
    <div>Loading...</div>
  ) : (
    <>
      {Nv.map((nv) => (
        <div className="form-text">
          <form className="main-content uedit" onSubmit={handleSubmit}>
            <h1 style={{ textAlign: "center" }}>Sửa nhân viên {nv.fullname}</h1>
            <br />
            <label>Tên nhân viên:</label> <br />
            <input
              type="text"
              name="fullname"
              onChange={(e) => setFullname(e.target.value)}
              size={30}
              required
            />
            <br />
            <br />
            <label>Mật khẩu:</label> <br />
            <input
              type="text"
              name="pass"
              size={30}
              onChange={(e) => setPasswords(e.target.value)}
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

export default NvEditing;
