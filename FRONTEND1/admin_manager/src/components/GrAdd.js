import React, { Component } from "react";
import axios from "axios";

const addgr = (tennhom, manhom) =>
  axios
    .post("/gradd", { tennhom, manhom })
    .then((resp) => resp.data);

class GrAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tennhom: "",
      manhom: ""
    };
  }
  isChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  handleClick = () => {
    console.log(JSON.stringify(this.state));
    var { tennhom, manhom } = this.state;
    addgr(tennhom, manhom).then((response) => {
      console.log(response);
    });
    
  };

  render() {
    return (
      <div className="form-text main-content uedit">
        <h1 style={{ textAlign: "center" }}>Thêm nhóm sản phẩm</h1>
        <form>
          <label>Mã nhóm:</label> <br />
          <input
            type="text"
            name="manhom"
            size={30}
            onChange={(event) => this.isChange(event)}
          />
          <br />
          <br />
          <label>Tên nhóm:</label> <br />
          <input
            type="text"
            name="tennhom"
            size={30}
            onChange={(event) => this.isChange(event)}
          />
          <br />
          <br />
          <input
            type="submit"
            defaultValue="Submit"
            onClick={() => this.handleClick()}
          />
          <input type="reset" defaultValue="Reset" />
          <br />
          <br />
        </form>
      </div>
    );
  }
}

export default GrAdd;
