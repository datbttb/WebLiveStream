import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignInForm() {

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const dangnhap = (e) => {
    e.preventDefault();
    var data = JSON.stringify({
      username: userName,
      password: password,
    });
    var config = {
      method: "post",
      url: "http://localhost:8081/api/v1/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.token);
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("username", userName);
        navigate("/");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert("Sai tài khoản hoặc mật khẩu");
      });
  };

  return (
      <div className="formCenter">
      <form className="formFields">
        <div className="formField">
          <label className="formFieldLabel" htmlFor="email">
            UserName
          </label>
          <input
            type="text"
            id="email"
            className="formFieldInput"
            placeholder="Nhập username"
            name="email"
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
          <button className="formFieldButton" onClick={dangnhap}>Đăng nhập</button>
          <Link to="/user/sign-up" className="formFieldLink">
            Tạo tài khoản mới
          </Link>
        </div>

        <div className="socialMediaButtons">
          <div className="facebookButton">
          </div>
          <div className="instagramButton">
          </div>
        </div>
      </form>
    </div>
  );
}
  
export default SignInForm;