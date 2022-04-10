import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function KhListing(props) {
  const [loading, setLoading] = useState(false);
  const [kh, setKh] = useState([]);

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
  const fetchKh = async () => {
    setLoading(true);
    const { data } = await axios.get(`/khlisting`);
    setLoading(false);
    setKh(data);
    totalPagesCalculate(data.length);
  };
  useEffect(() => {
    if (userInfo) {
      fetchKh();
    } else {
      props.history.push("/");
    }
  }, []);

  //=== Pagination
  const { page = 1 } = useParams();
  const filterKh = (khList) => {
    const firstParam = (page || 1) * 8 - 8;
    const secondParam = (page || 1) * 8;
    return khList.slice(firstParam, secondParam);
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
    <div className="main-content" style={{ width: "890px" }}>
      <h1 style={{ textAlign: "center" }}>Danh sách khách hàng</h1>
      <div className="product-items">
        <div className="buttons">
          {/* <a href="./user_create.php">Thêm nhân viên</a> */}
        </div>
        <table>
          <tbody>
            <tr>
              <th>
                <div className="product-prop product-right">Họ tên</div>
              </th>
              <th>
                <div className="product-prop product-right">Số điện thoại</div>
              </th>
              <th>
                <div className="product-prop product-name">Địa chỉ</div>
              </th>
              <th>
                <div
                  className="product-prop product-name"
                  style={{ width: "300px" }}
                >
                  Email
                </div>
              </th>
              <th>
                <div className="product-prop product-button">Sửa</div>
              </th>
            </tr>
            {filterKh(kh).map((kh) => (
              <tr>
                <th>
                  <div className="product-prop product-right">{kh.hoten}</div>
                </th>
                <th>
                  <div className="product-prop product-right">{kh.sdt}</div>
                </th>
                <th>
                  <div className="product-prop product-name">
                    {kh.diachi}
                  </div>
                </th>
                <th>
                  <div
                    className="product-prop product-name"
                    style={{ width: "300px" }}
                  >
                    {kh.email}
                  </div>
                </th>
                <th>
                  <div className="product-prop product-button">
                    <Link to={`/khediting/${kh.sdt}`}>Sửa</Link>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination1">
          <ul>
            <li>
              <Link to={`/khlisting/page/${prevPage(page)}`}>Prev</Link>
            </li>
            {totalPages.map((item) => (
              <li className={item === Number(page) ? "active" : ""}>
                <Link to={`/khlisting/page/${item}`}>{item}</Link>
              </li>
            ))}

            <li>
              <Link to={`/khlisting/page/${nextPage(page)}`}>Next</Link>
            </li>
          </ul>
        </div>
        <div className="clear-both" />
      </div>
    </div>
  );
}

export default KhListing;
