import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function PrsListing(props) {
  const [loading, setLoading] = useState(false);
  const [prs, setPrs] = useState([]);
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
  const fetchPrs = async () => {
    setLoading(true);
    const { data } = await axios.get(`/prslisting`);
    setLoading(false);
    setPrs(data);
    totalPagesCalculate(data.length);
  };
  useEffect(() => {
    if(userInfo){
      fetchPrs();
    }else{
      props.history.push("/");
    };
  }, []);

  //=== Pagination
  const { page = 1 } = useParams();
  const filterPrs = (prsList) => {
    const firstParam = (page || 1) * 8 - 8;
    const secondParam = (page || 1) * 8;
    return prsList.slice(firstParam, secondParam);
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

  const deletePrs = async (mshh) => {
    const { data } = await axios.post(`/prsdelete/${mshh}`);
    if (data != "Ok") {
      alert("Xóa sản phẩm không thành công");
    } else {
      window.location.reload();
    }
  };
  return loading ? (
    <div className="container">Loading...</div>
  ) : (
    <div className="main-content" style={{ width: "970px" }}>
      <h1 style={{ textAlign: "center" }}>Danh sách sản phẩm</h1>
      <div className="product-items">
        <div className="buttons">
          <Link to="/addproduct">Thêm sản phẩm</Link>
        </div>
        <table>
          <tbody>
            <tr>
              <th>
                <div
                  className="product-prop product-img"
                  style={{ height: "50px", textAlign: "center" }}
                >
                  Ảnh
                </div>
              </th>
              <th>
                <div className="product-prop product-name">Tên sản phẩm</div>
              </th>
              <th>
                <div className="product-prop product-right">Số lượng</div>
              </th>
              <th>
                <div className="product-prop product-right">Mã nhóm</div>
              </th>
              <th>
                <div className="product-prop product-right">Giá</div>
              </th>
              <th>
                <div className="product-prop product-button">Sửa</div>
              </th>
              <th>
                <div className="product-prop product-button">Xóa</div>
              </th>
            </tr>
            {filterPrs(prs).map((prs) => (
              <tr>
                <th>
                  <div className="product-prop product-img">
                    <img
                      src={`/${prs.hinh}`}
                      alt=""
                      title={prs.hinh}
                      width={157}
                      height={180}
                    />
                  </div>
                </th>
                <th>
                  <div
                    className="product-prop product-name"
                    style={{ height: "150px" }}
                  >
                    {prs.tenhh}
                  </div>
                </th>
                <th>
                  <div
                    className="product-prop product-right"
                    style={{ height: "150px" }}
                  >
                    {prs.soluonghang}
                  </div>
                </th>
                <th>
                  <div
                    className="product-prop product-right"
                    style={{ height: "150px" }}
                  >
                    {prs.manhom}
                  </div>
                </th>
                <th>
                  <div
                    className="product-prop product-right"
                    style={{ height: "150px" }}
                  >
                    {prs.gia}
                  </div>
                </th>
                <th>
                  <div
                    className="product-prop product-button"
                    style={{ height: "150px" }}
                  >
                    <Link to={`/spediting/${prs.mshh}`}>Sửa</Link>
                  </div>
                </th>
                <th>
                  <div
                    className="product-prop product-button"
                    style={{ height: "150px" }}
                  >
                    <Link onClick={() => deletePrs(prs.mshh)}>Xóa</Link>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination1">
          <ul>
            <li>
              <Link to={`/prslisting/page/${prevPage(page)}`}>Prev</Link>
            </li>
            {totalPages.map((item) => (
              <li className={item === Number(page) ? "active" : ""}>
                <Link to={`/prslisting/page/${item}`}>{item}</Link>
              </li>
            ))}

            <li>
              <Link to={`/prslisting/page/${nextPage(page)}`}>Next</Link>
            </li>
          </ul>
        </div>
        <div className="clear-both" />
      </div>
    </div>
  );
}

export default PrsListing;
