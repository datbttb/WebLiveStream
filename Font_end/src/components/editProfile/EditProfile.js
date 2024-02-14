import React from 'react';
import './EditProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../header/Header";
import Sidebar from "../slidebar/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function EditProfile() {

  const [user,setUser] = useState();
  const [urlImg,setUrlImg] = useState();
  const [isLoading,setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameImg, setNameImg] = useState("anhdep");
  const [selectedDate, setSelectedDate] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [phone,setPhone] = useState();
  const [gender, setGender] = useState();

  const upFileAnh = () => {
    let data = new FormData();
    data.append('file', file);
    data.append('customFileName', nameImg);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/upfile/upimage',
      data : data
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const capNhat = async (e) => {
    var gioitinh = null;
    if(gender == "Nam"){
      gioitinh = 1;
    }
    if(gender == "Nữ"){
      gioitinh = 0;
    }

    let data = JSON.stringify({
      "username": user.username,
      "password": "12345678",
      "email": email,
      "avatar": nameImg,
      "name": name,
      "id": user.id,
      "birthday": birthday,
      "phone": phone,
      "gender": gioitinh
    });
    
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/user/update-user',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      upFileAnh();
      alert("cập nhật thông tin thành công");
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });  
  }

  useEffect (() => {
    var data = ""
    var path = window.location.pathname.split("/");
    var username = localStorage.getItem("username");
    if(path[1]=='admin'){
      username = path[3];
    }
    var config = {
        method: "get",
        url: "http://localhost:8081/user/get-by-username/"+username,
        headers: {},
        data: data,
    };

    axios(config)
        .then(function (response) {
            setUser(response.data);
            setName(response.data.name);
            setEmail(response.data.email);
            setNameImg(response.data.avatar);
            const originalDateString = response.data.birthday;
            const originalDate = new Date(originalDateString);
            const year = originalDate.getFullYear();
            const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
            const day = String(originalDate.getDate()).padStart(2, '0');
            const formattedDateString = `${year}-${month}-${day}`;
            setBirthday(originalDate);

            if(response.data.avatar == 'anhdep'){
                setUrlImg("http://localhost:8081/upfile/getimg/anhdep.jpg");
            }
            else{
                setUrlImg("http://localhost:8081/upfile/getimg/"+username+".jpg");
            }
            console.log(JSON.stringify(response.data.username));

            if(response.data.gender == "1"){
              setGender("Nam");
            }
            if(response.data.gender == "0"){
              setGender("Nữ");
            }

            setPhone(response.data.phone);

            setIsLoading(true);
        })
        .catch(function (error){
            console.log(error);
        });
  }, []);


	return (
    <div className="App">
        <Header/>
        <div className="main-display">
            <Sidebar/>
            {isLoading ? (
            <div className='edit-profile'>
			<div class="container bootstrap snippets bootdey">
      <hr/>
	<div class="row">  
      <div class="col-md-3">
        <div class="text-center">
          <img src={urlImg} class="avatar img-circle img-thumbnail" alt="avatar"/>
          
          <input type="file" class="form-control" onChange={(e) => {setFile(e.target.files[0]);setNameImg(user.username)}}/>
        </div>
      </div>
      
      
      <div class="col-md-9 personal-info">
        <h3>Thông tin người dùng</h3>
        <div class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-3 control-label">Họ và tên</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Email:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Số điện thoại:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value={phone} onChange={(e) => {setPhone(e.target.value)}}/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Giới tính:</label>
            <select class="form-select" id="sel" onChange={(e) => {setGender(e.target.value)}} value={gender}>
              <option>None</option>
              <option>Nam</option>
              <option>Nữ</option>
            </select>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Ngày sinh:</label>
            <div class="col-lg-8">
              <ReactDatePicker
                selected={birthday}
                onChange={date => setBirthday(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select Date"
              />
            </div>
          </div>
          <button className='btn-cap-nhat' onClick={capNhat}>Cập nhật thông tin</button>
        </div>
      </div>
  </div>
</div>
<hr/>
		</div>
    ):(
      <div></div>
    )}
        </div>
    </div>
	);
}
export default EditProfile;