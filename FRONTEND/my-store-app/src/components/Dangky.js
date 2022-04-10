import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const addKH = (hoten, sdt, pass, diachi, email) =>
    axios.post('/addkh', {hoten, sdt, pass, diachi, email})
    .then((resp)=>resp.data)

class Dangky extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoten: '',
            sdt: '',
            pass: '',
            diachi: '',
            email: ''
        }
    }
    isChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]:value
        });
    }
    handleClick = () => {
        console.log(JSON.stringify(this.state));
        var {hoten, sdt, pass, diachi, email} = this.state
        addKH(hoten, sdt, pass, diachi, email).then((response)=>{
            console.log(response);
        })
        alert("Bạn đã đăng ký thành công!!!");
    }

    render() {
        return (
            <div className="loginout">
                <h1>Đăng ký thành viên</h1>
                <div className="thongtin">
                    <form >
                    <table className="tabledndk">
                        <tbody><tr>
                            <td > Họ tên của bạn</td>
                            <td><input onChange={(event)=> this.isChange(event)}
                                type="text" className="form-control" name="hoten" id="hoten" /></td>
                        </tr>
                        <tr>
                            <td> Số điện thoại</td>
                            <td><input onChange={(event)=> this.isChange(event)}
                                type="text" className="form-control" name="sdt" id="sdt" /></td>
                        </tr>
                        <tr>
                            <td> Nhập mật khẩu</td>
                            <td><input onChange={(event)=> this.isChange(event)}
                                type="password" className="form-control" name="pass" id="pass" /></td>         
                        </tr>
                        <tr>
                            <td> Nhập lại mật khẩu</td>
                            <td><input onChange={(event)=> this.isChange(event)}
                                type="password" className="form-control" name="repass" id="repass" /></td>
                        </tr>
                        <tr>
                            <td> Địa chỉ</td>
                            <td><input onChange={(event)=> this.isChange(event)}
                                type="text" className="form-control" name="diachi" id="diachi" /></td>
                        </tr>
                        <tr>
                            <td> Email</td>
                            <td><input onChange={(event)=> this.isChange(event)}
                                type="text" className="form-control" name="email" id="email" /></td>
                        </tr>
                        <tr className="submit">
                            <td colSpan={2} align="center">
                            <button type="reset" onClick={()=>this.handleClick()} className="btn btn-info">Đăng ký</button>
                            <button type="reset" className="btn btn-info">Làm lại</button>
                            </td>
                        </tr>       
                        </tbody></table>
                    </form>
                    <p><Link to="/dangnhap">Đã có tài khoản? Hãy đăng nhập tại đây!!!</Link></p>   
                </div>
            </div>
        );
    }
}

export default Dangky;