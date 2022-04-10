import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Category(props) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [productsCate, setProductsCate] = useState([]);

  const manhom = props.match.params.manhom;

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      const res = await axios.get(`/category/${manhom}`);
      setLoading(false);
      setProductsCate(res.data);
    };
    fetchCategory();
  }, [manhom]);

  console.log(productsCate)

  return loading ? (
    <div className="container">Loading...</div>
  ) : (
    <>
      <div className="container products">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              {productsCate.map((product) => (
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="card h-100">
                    <Link to={`/sanpham/${product.mshh}`}>
                      <img
                        className="card-img-top"
                        src={`/${product.hinh}`}
                        alt=""
                      />
                      <div className="card-body">
                        <h4 className="card-title">
                          {product.tenhh}
                        </h4>
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
    </>
  );
}

export default Category;
