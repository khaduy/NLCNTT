import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useParams } from "react-router-dom";

class Banner extends Component {
  render() {
    return (
      <div className="banner">
        <Container>
          <Row>
            <Col sm={5}>
              <Carousel>
                <Carousel.Item interval={10000}>
                  <Link to="/sanpham/20006">
                    <img
                      className=" w-100"
                      src="/images/Untitled3.png"
                      alt=""
                    />
                  </Link>
                </Carousel.Item>
                <Carousel.Item interval={10000}>
                <Link to="/sanpham/20001">
                    <img
                      className=" w-100"
                      src="/images/Untitled2.png"
                      alt=""
                    />
                  </Link>
                </Carousel.Item>
              </Carousel>
            </Col>

            <Col sm={7}>
              <Carousel>
                <Carousel.Item interval={10000}>
                <Link to="/sanpham/10005">
                    <img
                      className=" w-100"
                      src="/images/Untitled4.png"
                      alt=""
                    />
                  </Link>
                </Carousel.Item>
                <Carousel.Item interval={10000}>
                  <Link to="/sanpham/10001">
                    <img
                      className=" w-100"
                      src="/images/Untitled1.png"
                      alt=""
                    />
                  </Link>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Banner;
