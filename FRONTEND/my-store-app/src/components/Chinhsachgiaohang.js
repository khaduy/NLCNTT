import React, { Component } from "react";

class Chinhsachdoitra extends Component {
  render() {
    return (
      <div style={{ width: "1000px", margin: "20px 60px 50px 80px" }}>
        <h4 style={{ fontWeight: "bold" }}>1. Phạm vi áp dụng:</h4>
        <p>Những khu vực tỉnh thành thuộc địa phận Việt Nam.</p>
        <h4 style={{ fontWeight: "bold" }}>2. Thời gian nhận hàng:</h4>
        <p>
          Đặt hàng trước 11h30p bạn sẽ nhận hàng trước 18h cùng ngày. <br />
          Đặt hàng sau 11h30p đơn hàng chuyển sang giao trước 18h ngày hôm sau .
        </p>
        <h4 style={{ fontWeight: "bold" }}>3. Phí giao hàng:</h4>
        <p>
          Đơn hàng trên 300.000đ: miễn phí giao hàng. <br />
          Đơn hàng dưới 300.000đ: phụ thu 10.000đ phí giao hàng:
        </p>
      </div>
    );
  }
}

export default Chinhsachdoitra;
