import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function NvListing(props) {
  const [loading, setLoading] = useState(false);
  const [nv, setNv] = useState([]);
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
  const fetchNv = async () => {
    setLoading(true);
    const { data } = await axios.get(`/nvlisting`);
    setLoading(false);
    setNv(data);
    totalPagesCalculate(data.length);
  };
  useEffect(() => {
    console.log(userInfo)
    // đây check xem user co phai admin k phải thì oử laij trang k thì ve trang home
    if(userInfo && userInfo.username == "admin"){
      fetchNv();
    }else{
      props.history.push("/");
    }
  }, []);

  //=== Pagination
  const { page = 1 } = useParams();
  const filterNv = (nvList) => {
    const firstParam = (page || 1) * 8 - 8;
    const secondParam = (page || 1) * 8;
    return nvList.slice(firstParam, secondParam);
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

  const deleteNv = async (nv) =>{
    const { data } = await axios.post(`/nvdelete/${nv}`);
    if(data != "Ok"){
      alert("Không thể xóa nhân viên này")
    }
    window.location.reload();
  }

  return loading ? (
    <div className="container">Loading...</div>
  ) : (
    <div className="main-content" style={{ width: "840px" }}>
      <h1 style={{ textAlign: "center" }}>Danh sách nhân viên</h1>
      <div className="product-items">
        <div className="buttons">
          <Link to={`/nvadd`}>Thêm nhân viên</Link>
        </div>
        <table>
          <tbody>
            <tr>
              <th>
                <div
                  className="product-prop product-right"
                  style={{ width: "50px" }}
                >
                  ID
                </div>
              </th>
              <th>
                <div className="product-prop product-right">Chức vụ</div>
              </th>
              <th>
                <div className="product-prop product-name">Tên nhân viên</div>
              </th>
              <th>
                <div
                  className="product-prop product-name"
                  style={{ width: "300px" }}
                >
                  Ngày tạo
                </div>
              </th>
              <th>
                <div className="product-prop product-button">Sửa</div>
              </th>
              <th>
                <div className="product-prop product-button">Xóa</div>
              </th>
            </tr>
            {filterNv(nv).map((nv) => (
              <tr>
                <th>
                  <div
                    className="product-prop product-right"
                    style={{ width: "50px" }}
                  >
                    {nv.id}
                  </div>
                </th>
                <th>
                  <div className="product-prop product-right">
                    {nv.usernames}
                  </div>
                </th>
                <th>
                  <div className="product-prop product-name">{nv.fullname}</div>
                </th>
                <th>
                  <div
                    className="product-prop product-name"
                    style={{ width: "300px" }}
                  >
                    {nv.created_time}
                  </div>
                </th>
                <th>
                  <div className="product-prop product-button">
                    <Link to={`/nvediting/${nv.id}`}>Sửa</Link>
                  </div>
                </th>
                <th>
                  <div className="product-prop product-button">
                    <Link onClick = {() => deleteNv(nv.id)}>Xóa</Link>
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
            <Link to={`/nvlisting/page/${prevPage(page)}`}>Prev</Link>
          </li>
          {totalPages.map((item) => (
            <li className={item === Number(page) ? "active" : ""}>
              <Link to={`/nvlisting/page/${item}`}>{item}</Link>
            </li>
          ))}

          <li>
            <Link to={`/nvlisting/page/${nextPage(page)}`}>Next</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NvListing;
