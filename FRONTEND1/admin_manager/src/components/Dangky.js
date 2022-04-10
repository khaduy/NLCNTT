import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const addadmin = (usernames, fullname, passwords) =>
    axios.post('/addadmin', {usernames, fullname, passwords})
    .then((resp)=>resp.data)

class Dangky extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernames: '',
            fullname: '',
            passwords: ''
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
        var {usernames, fullname, passwords} = this.state
        addadmin(usernames, fullname, passwords).then((response)=>{
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
                            <td > Username</td>
                            <td><input onChange={(event)=> this.isChange(event)}
                                type="text" className="form-control" name="username" id="username" /></td>
                        </tr>
                        <tr>
                            <td> Fullname</td>
                            <td><input onChange={(event)=> this.isChange(event)}
                                type="text" className="form-control" name="fullname" id="fullname" /></td>
                        </tr>
                        <tr>
                            <td> Nhập mật khẩu</td>
                            <td><input onChange={(event)=> this.isChange(event)}
                                type="password" className="form-control" name="password" id="password" /></td>         
                        </tr>
                        <tr>
                            <td> Nhập lại mật khẩu</td>
                            <td><input onChange={(event)=> this.isChange(event)}
                                type="password" className="form-control" name="repass" id="repass" /></td>
                        </tr>
                        <tr className="submit">
                            <td colSpan={2} align="center">
                            <button type="reset" onClick={()=>this.handleClick()} className="btn btn-info">Đăng ký</button>
                            <button type="reset" className="btn btn-info">Làm lại</button>
                            </td>
                        </tr>       
                        </tbody></table>
                    </form>
                    <p><Link to="/login">Đã có tài khoản? Hãy đăng nhập tại đây!!!</Link></p>   
                </div>
            </div>
        );
    }
}

export default Dangky;