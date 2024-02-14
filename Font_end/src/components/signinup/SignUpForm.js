import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpForm() {

  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const dangKy = (e) => {
    e.preventDefault();
    var data = JSON.stringify({
      username: userName,
      password: password,
      email: email,
      avatar: "anhdep",
      name: name
    });

    // "username":"an239",
    // "password":"12345678",
    // "email":"Haian@gmail.com",
    // "avatar":"anhdep",
    // "name":"Hải An"

    var config = {
      method: "post",
      url: "http://localhost:8081/api/v1/auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data === "User registered successfully") {
          navigate("/user/sign-in");
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
        window.alert(error.response.data);
      });
  };

  return (
      <div className="formCenter">
      <form className="formFields">
        <div className="formField">
          <label className="formFieldLabel" htmlFor="name">
            Họ và tên
          </label>
          <input
            type="text"
            id="name"
            className="formFieldInput"
            placeholder="Nhập họ và tên"
            name="name"
            onChange={(e) => {setName(e.target.value)}}
          />
        </div>

        <div className="formField">
          <label className="formFieldLabel" htmlFor="name">
            User name
          </label>
          <input
            type="text"
            id="user-name"
            className="formFieldInput"
            placeholder="Nhập username"
            name="user-name"
            onChange={(e) => {setUserName(e.target.value)}}
          />
        </div>
        
        <div className="formField">
          <label className="formFieldLabel" htmlFor="password">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            className="formFieldInput"
            placeholder="Nhập mật khẩu"
            name="password"
            onChange={(e) => {setPassword(e.target.value)}}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="email">
            Địa chỉ E-Mail
          </label>
          <input
            type="email"
            id="email"
            className="formFieldInput"
            placeholder="Nhập địa chỉ E-Mail"
            name="email"
            onChange={(e) => {setEmail(e.target.value)}}
          />
        </div>
        <div className="formField">
          <button className="formFieldButton" onClick={dangKy}>Đăng ký</button>
          <Link to="/user/sign-in" className="formFieldLink">
            Tôi đã là thành viên
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;