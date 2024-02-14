import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
function Sidebar() {

  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleTrangChuClick = (e) => {
    navigate("/");
    window.location.reload();
  }

  const handleListVideoRecord = (e) => {
    navigate("/video-list/video-record");
    window.location.reload();
  }

  const handleListVideoLive = (e) => {
    navigate("/video-list/video-live");
    window.location.reload();
  }

  const handleClickVideoLike = (e) =>{
    navigate('/video-list/video-like');
    window.location.reload();
  }

  const handelClickDangTheoDoi = (e) =>{
    navigate("/dang-theo-doi");
    window.location.reload();
  }

  const handleClickTheoDoi = (e) =>{
    navigate("/theo-doi");
    window.location.reload();
  }

  const handleClickQLVideo = (e) =>{
    navigate("/admin/videomanagement");
    window.location.reload();
  }

  const handleClickQLUser = (e) =>{
    navigate("/admin/usermanagement");
    window.location.reload();
  }

  const handleClickQLBaoCao = (e) =>{
    navigate("/admin/phanhoimanagement");
    window.location.reload();
  }

  useEffect(() => {
    const username = window.localStorage.getItem("username");
    var config = {
      method: "get",
      url: "http://localhost:8081/user/get-by-username/"+username,
      headers: {},
    };

    axios(config)
        .then(function (response) {
          if(response.data.role_id.id==2){
            setIsAdmin(true);
          }
        })
        .catch(function (error){
            console.log(error);
        });
  });

  return (
    <div className="sidebar d-flex align-items-center pointer ">
      <div className="sidebar-items d-flex align-items-center active" onClick={handleTrangChuClick}>
        <svg
          viewBox="0 0 24 25"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          class="style-scope yt-icon"
          style={{ width: "20px", height: "20px", margin: "0px 20px" }}
        >
          <g class="style-scope yt-icon">
            <path
              d="M4,10V21h6V15h4v6h6V10L12,3Z"
              class="style-scope yt-icon"
            ></path>
          </g>
        </svg>
        <span className="sidebar-text">Trang chủ</span>
      </div>

      <div className="sidebar-items d-flex align-items-center active" onClick={handleListVideoLive}>
        <svg
          viewBox="0 0 24 25"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          class="style-scope yt-icon"
          style={{ width: "20px", height: "20px", margin: "0px 20px" }}
        >
          <g class="style-scope yt-icon">
            <path
              d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86l-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"
              class="style-scope yt-icon"
            ></path>
          </g>
        </svg>
        <span className="sidebar-text">Đang phát trực tiếp</span>
      </div>

      <div className="sidebar-items d-flex align-items-center active" onClick={handelClickDangTheoDoi}>
        <svg
          viewBox="0 0 24 25"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          class="style-scope yt-icon"
          style={{ width: "20px", height: "20px", margin: "0px 20px" }}
        >
          <g class="style-scope yt-icon">
            <path
              d="M10,18v-6l5,3L10,18z M17,3H7v1h10V3z M20,6H4v1h16V6z M22,9H2v12h20V9z M3,10h18v10H3V10z"
              class="style-scope yt-icon"
            ></path>
          </g>
        </svg>
        <span className="sidebar-text">Kênh đã đăng ký</span>
      </div>
      <div className="sidebar-items d-flex align-items-center active" onClick={handleListVideoRecord}>
        <svg
          viewBox="0 0 24 25"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          class="style-scope yt-icon"
          style={{ width: "20px", height: "20px", margin: "0px 20px" }}
        >
          <g class="style-scope yt-icon">
            <path
              d="M4,20h14v1H3V6h1V20z M21,3v15H6V3H21z M17,10.5L11,7v7L17,10.5z"
              class="style-scope yt-icon"
            ></path>
          </g>
        </svg>
        <span className="sidebar-text">Xem lại</span>
      </div>

      <div className="sidebar-items d-flex align-items-center active" onClick={handleClickTheoDoi}>
        <svg
          viewBox="0 0 24 25"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          class="style-scope yt-icon"
          style={{ width: "20px", height: "20px", margin: "0px 20px" }}
        >
          <g class="style-scope yt-icon">
            <path
              d="M10,8l6,4l-6,4V8L10,8z M21,3v18H3V3H21z M20,4H4v16h16V4z"
              class="style-scope yt-icon"
            ></path>
          </g>
        </svg>
        <span className="sidebar-text">Người đã follow</span>
      </div>

      <div className="sidebar-items d-flex align-items-center active" onClick={handleClickVideoLike}>
        <svg
          viewBox="0 0 24 25"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          class="style-scope yt-icon"
          style={{ width: "20px", height: "20px", margin: "0px 20px" }}
        >
          <g class="style-scope yt-icon">
            <path
              d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"
              class="style-scope yt-icon"
            ></path>
          </g>
        </svg>
        <span className="sidebar-text">Videos đã thích</span>
      </div>
      {
        isAdmin ? (
          <div>
            <p style={{ margin: "10px 20px 0px 20px", fontWeight:"bold"}}>Quyền admin</p>
            <div className="sidebar-items d-flex align-items-center active" onClick={handleClickQLUser}>
              <FontAwesomeIcon icon={faPeopleGroup} style={{ width: "20px", height: "20px", margin: "0px 20px" }}/>
              <span className="sidebar-text">Quản lý người dùng</span>
            </div>
              <div className="sidebar-items d-flex align-items-center active" onClick={handleClickQLVideo}>
                <FontAwesomeIcon icon={faPhotoFilm} style={{ width: "20px", height: "20px", margin: "0px 20px" }} />
                <span className="sidebar-text">Quản lý video</span>
              </div>
              <div className="sidebar-items d-flex align-items-center active" onClick={handleClickQLBaoCao}>
                <FontAwesomeIcon icon={faFlag} style={{ width: "20px", height: "20px", margin: "0px 20px" }} />
                <span className="sidebar-text">Quản lý báo cáo</span>
              </div>
          </div>
        ):(
          <div></div>  
        )
      }
    </div>
  );
}
export default Sidebar;
