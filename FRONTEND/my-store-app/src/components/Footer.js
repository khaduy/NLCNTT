import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="contact">
          <h2>Contact me:</h2>
          <p>
            <span>Email: </span>
            <a href="mailto:duyb1706793@student.ctu.edu.vn">
              duyb1706793@student.ctu.edu.vn
            </a>
          </p>
          <p>
            <span>Tel: </span>
            <a href="tel:0386580528">038.658.0528</a>
          </p>
        </div>
        <div className="follow">
          <h2>Follow me:</h2>
          <a
            id="trai"
            href="https://www.facebook.com/akira.duy.52"
            target="_blank"
          >
            <img src="/images/fb.png" width="70px" alt="" />
          </a>
          <a
            id="phai"
            href="https://www.instagram.com/ktd.duy/"
            target="_blank"
          >
            <img src="/images/ins.png" width="70px" alt="" />
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
