import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Prs(props) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const totalPagesCalculate = (arrLength) => {
    const totalP = [];
    for (let i = 1; i <= Math.ceil(arrLength / 8); i++) {
      totalP.push(i);
    }
    setTotalPages(totalP);
  };
  const fetchPrs = async () => {
    setLoading(true);
    const { data } = await axios.get(`/dssanpham`);
    setLoading(false);
    setProducts(data);
    totalPagesCalculate(data.length);
  };
  useEffect(() => {
    fetchPrs();
  }, []);
  
  const { page = 1 } = useParams();
  //=== Pagination
  const filterPrs = (prsList) => {
    // tong cong: 12 comment => so' trang max: 3
    // trang 1: 4 records => offset 0 , limit 4 = >slice (0, 4)
    // trang 2: 4 records => offset 4, limit 4 => slice(4, 8)
    // trang 3: 4 records => offset 8, litmit 4 => slice(8, 12)
    // cong thuc: offset = trang * 4 - 4 // vd: trang 1 = 1 * 4 - 4 = 0, trang 2 = 2*4-4 = 4
    // limit = trang * 4
    const firstParam = (page || 1) * 8 - 8; // Nếu ko có tham số page thì mặc định 1 => || 1
    const secondParam = (page || 1) * 8;
    return prsList.slice(firstParam, secondParam);
  };

  // tinh tong trang
  // const totalPages = [];

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
    <>
      <div className="container products">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              {filterPrs(products).map((product) => (
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="card h-100">
                    <Link to={`/sanpham/${product.mshh}`}>
                      <img
                        className="card-img-top"
                        src={`/${product.hinh}`}
                        alt=""
                      />
                      <div className="card-body">
                        <h4 className="card-title">{product.tenhh}</h4>
                        <h5 className="card-title">
                          {product.gia.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </h5>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pagination1">
        <ul>
          <li>
            <Link to={`/page/${prevPage(page)}`}>
              Prev
            </Link>
          </li>
          {totalPages.map((item) => (
            <li className={item === Number(page) ? "active" : ""}>
              <Link to={`/page/${item}`}>{item}</Link>
            </li>
          ))}

          <li>
            <Link to={`/page/${nextPage(page)}`}>
              Next
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Prs;
