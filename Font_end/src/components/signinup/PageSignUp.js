import React, { useEffect, useState } from "react";
import "./PageLogin.css"
import {BrowserRouter, Routes, Route, NavLink, Router} from "react-router-dom";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

function PageSignUp() {
    
    // const pathname = window.location.pathname
    // const [isSignIn,setisSignIn] = useState(false);
    // const [isSignUP,setisSignUP] = useState(false);

    // const reloadPage = () => {
    //     window.location.reload();
    // }

    // useEffect(() => {
    //     if(pathname=="/user/sign-in"){
    //         setisSignIn(true);
    //     }
    //     if(pathname=="/user/sign-up"){
    //         setisSignUP(true);
    //     }
    // })

    // console.log(isSignIn)

    return (
        <div className="Page-Login">
            <div className="appAside" />
                <div className="appForm">
                    <div className="pageSwitcher">
                    <NavLink
                        to="/user/sign-in"
                        className={({isActive}) => (isActive ? "pageSwitcherItem pageSwitcherItem-active":"pageSwitcherItem")}
                    >
                        Đăng nhập
                    </NavLink>
                    <NavLink
                        exact
                        to="/user/sign-up"
                        className={({isActive}) => (isActive ? "pageSwitcherItem pageSwitcherItem-active":"pageSwitcherItem")}
                    >
                        Đăng ký
                    </NavLink>
                    </div>

                    <div className="formTitle">
                    <NavLink
                        to="/user/sign-in"
                        className={({isActive}) => (isActive ? "formTitleLink formTitleLink-active":"formTitleLink")}
                    >
                        Đăng nhập
                    </NavLink>{" "}
                    or{" "}
                    <NavLink
                        exact
                        to="/user/sign-up"
                        className={({isActive}) => (isActive ? "formTitleLink formTitleLink-active":"formTitleLink")}
                    >
                        Đăng ký
                    </NavLink>
                </div>
                <SignUpForm />
            </div>
        </div>
    );
  }
  
  export default PageSignUp;