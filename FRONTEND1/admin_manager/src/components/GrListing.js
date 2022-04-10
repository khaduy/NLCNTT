import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function GrListing(props) {
  const [loading, setLoading] = useState(false);
  const [gr, setGr] = useState([]);
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
  const fetchGr = async () => {
    setLoading(true);
    const { data } = await axios.get(`/grlisting`);
    setLoading(false);
    setGr(data);
    totalPagesCalculate(data.length);
  };
  useEffect(() => {
    if(userInfo){
      fetchGr();
    }else{
      props.history.push("/");
    }
  }, []);

  //=== Pagination
  const { page = 1 } = useParams();
  const filterGr = (grList) => {
    const firstParam = (page || 1) * 8 - 8;
    const secondParam = (page || 1) * 8;
    return grList.slice(firstParam, secondParam);
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

  const deleteGr = async (gr) =>{
    const { data } = await axios.post(`/grdelete/${gr}`);
    if(data != "Ok"){
      alert("Vui lòng xóa tất cả các sản phẩm liên quan trước khi xóa loại sản phẩm này")
    }
    window.location.reload();
  }

  return loading ? (
    <div className="container">Loading...</div>
  ) : (
    <div className="main-content" style={{ width: "500px" }}>
      <h1 style={{ textAlign: "center" }}>Danh sách nhóm sản phẩm</h1>
      <div className="product-items">
        <div className="buttons">
          <Link to='/gradd'>Thêm nhóm sản phẩm</Link>
        </div>
        <table style={{ marginLeft: "30px" }}>
          <tbody>
            <tr>
              <th>
                <div className="product-prop product-name">Tên nhóm</div>
              </th>
              <th>
                <div className="product-prop product-right">Mã nhóm</div>
              </th>
              <th>
                <div className="product-prop product-button">Xóa</div>
              </th>
            </tr>
            {filterGr(gr).map((gr) => (
              <tr>
                <th>
                  <div className="product-prop product-name">{gr.tennhom}</div>
                </th>
                <th>
                  <div className="product-prop product-right">{gr.manhom}</div>
                </th>
                <th>
                  <div className="product-prop product-button">
                    <Link onClick = {() => deleteGr(gr.manhom)}>Xóa</Link>
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
            <Link to={`/grlisting/page/${prevPage(page)}`}>Prev</Link>
          </li>
          {totalPages.map((item) => (
            <li className={item === Number(page) ? "active" : ""}>
              <Link to={`/grlisting/page/${item}`}>{item}</Link>
            </li>
          ))}

          <li>
            <Link to={`/grlisting/page/${nextPage(page)}`}>Next</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GrListing;
