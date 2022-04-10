import React, { Component } from "react";
// import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

class Product extends Component {
  render() {
    return (
      <div className="col-lg-3 col-md-6 mb-4">
        <div className="card h-100">
          <Link to={`/sanpham/${this.props.product.mshh}`}>
            <img
              className="card-img-top"
              src={this.props.product.hinh}
              alt=""
            />
            <div className="card-body">
              <h4 className="card-title">{this.props.product.tenhh}</h4>
              <h5 className="card-title">
                {this.props.product.gia.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </h5>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Product;
