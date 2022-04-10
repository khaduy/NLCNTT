import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Accessories() {
  const [loading, setLoading] = useState(false);
  const [Acc1, setAcc1] = useState([]);
  const [Acc2, setAcc2] = useState([]);
  const fetchAcc1 = async () => {
    setLoading(true);
    const { data } = await axios.get(`/accessories1`);
    setLoading(false);
    setAcc1(data);
  };
  useEffect(() => {
    fetchAcc1();
  }, []);
  const fetchAcc2 = async () => {
    setLoading(true);
    const { data } = await axios.get(`/accessories2`);
    setLoading(false);
    setAcc2(data);
  };
  useEffect(() => {
    fetchAcc2();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Container>
      <div className="row">
        <div className="col-md-12">
          <div
            id="carousel"
            className="carousel slide"
            data-ride="carousel"
            data-type="multi"
            data-interval={2500}
            style={{ marginTop: "20px" }}
          >
            <h1 className="btn-grad3">Phụ Kiện</h1>
            <div className="carousel-inner">
              <div className="item active">
                <div className="row">
                  {Acc1.map((acc1) => (
                    <div className="showitem">
                      <div className="col-md-3 item-product bor">
                        <a href="detail.php?id=<?php echo $row['mshh']?>">
                          <img
                            src={`/${acc1.hinh}`}
                            className
                            width={157}
                            height={180}
                          />
                        </a>
                        <div className="info-item">
                          <a href="detail.php?id=<?php echo $row['mshh']?>">
                            {acc1.tenhh}
                          </a>
                          <p>
                            <b className="price">
                              {acc1.gia.toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </b>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="item">
                <div className="row">
                {Acc2.map((acc2) => (
                  <div className="showitem">
                    <div className="col-md-3 item-product bor">
                      <a href="detail.php?id=<?php echo $row['mshh']?>">
                        <img
                          src={`/${acc2.hinh}`}
                          className
                          width={157}
                          height={180}
                        />
                      </a>
                      <div className="info-item">
                        <a href="detail.php?id=<?php echo $row['mshh']?>">{acc2.tenhh}</a>
                        <p>
                          <b className="price">{acc2.gia.toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            </div>

            <Link
              data-slide="prev"
              to="#carousel"
              className="left carousel-control"
            >
              <i className="fa fa-chevron-circle-left" aria-hidden="true" />
            </Link>
            <Link
              data-slide="next"
              data-ride="carousel"
              to="#carousel"
              className="right carousel-control"
            >
              <i className="fa fa-chevron-circle-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Accessories;
