import './SetUpLive.css';
import Header from '../header/Header';
import Sidebar from '../slidebar/Sidebar';
import VideoPlay from '../videoPlay/VideoPlay';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'bootstrap';
import moment from 'moment/moment';

function SetUpLive() {

  const [nameLive, setNameLive] = useState("");
  const [streamKey, setStreamKey] = useState("");
  const [mcRTMP, setMcRTMP] = useState("");
  const [url, setUrl] = useState("");
  const [view, setView] = useState("");
  const [date, setDate] = useState("");
  const [isStream, setIsStream]  = useState(false);
  const [urlVideoStream, setUrlVideoStream] = useState("");
  const [biHanChe, setBiHanChe] = useState(false);

  const layThongTinNguoiDung = () => {
    const username = window.localStorage.getItem("username");
    var config = {
      method: "get",
      url: "http://localhost:8081/user/get-by-username/"+username,
      headers: {},
    };

    axios(config)
        .then(function (response) {
          if(response.data.role_id.id==3){
            setBiHanChe(true);
          }
        })
        .catch(function (error){
            console.log(error);
        });
  }

//Tạo mới số lượt xem
  const taoMoiSoLuotXem = (room) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/startstream?room='+room,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
    })
    .catch((error) => {
      console.log(error);
    });
  };

//Tạo key mới
  const taokey = ((e) =>{
    if(streamKey != ""){
      alert("Bạn đã có key rồi muốn tạo mới key hãy nhấn vào tạo mới");
    }
    else{
      var username = window.localStorage.getItem("username")
      let data = JSON.stringify({
        "username": username,
        "mayChu": 1
      });
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8081/stream-key/add-key',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  });

//Bắt đầu stream
  const themVideo = ((e) => {
    var username = window.localStorage.getItem("username");
    setIsStream(true);
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const currentMoment = moment();
    const formattedString = currentMoment.format('YYYY-MM-DD HH:mm:ss');
    if(nameLive == ""){
      alert("Hãy nhập tên live");
    }
    else if(biHanChe==true){
      alert("Tài khoản của bạn bị hạn chế do đã vi phạm tiêu chuẩn cộng đồng vui lòng liên hệ với chúng tôi qua email để nhận thông tin chi tiết");
    }
    else{
      let data = JSON.stringify({
        "name": nameLive,
        "views": "0",
        "url": ""+username+timestamp,
        "date": formattedString,
        "username": username,
        "trangThai": 1
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8081/video/addVideo',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        alert("video đang được stream");
        setDate(formattedString);
        setUrl(""+username+timestamp);
        setView("10");
        // xoaFileTruocKhiStream(username);
        taoMoiSoLuotXem(username);
      })
      .catch((error) => {
        alert("Bạn đang trong một live khác vui lòng tạm dừng phiên live hiện tại để có thể bắt đầu một phiên live mới");
      });
      // alert("Ok");
    }
  });
//////////////////////////////////////////////////////////////////////
  const tatphienlive = ((e) => {
    var username = window.localStorage.getItem("username");

    //Lấy thông tin lượt xem
    let config1 = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/slview?room='+username,
      headers: { }
    };
    
    axios.request(config1)
    .then((response) => {
      var luotxem = response.data;
      // update csdl
      let data = JSON.stringify({
        "name": nameLive,
        "views": luotxem,
        "url": url,
        "date": date,
        "username": username,
        "trangThai": 2
      });
      
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'http://localhost:8081/video/updateVideo',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        // sửa tên file
        let data2 = JSON.stringify({
          "nameold": username,
          "namenew": url
        });
        
        let config2 = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:8000/ngungStream',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data2
        };
        
        axios.request(config2)
        .then((response) => {
          alert("Phiên live đã dừng lại");
        })
        .catch((error) => {
          console.log(error);
          alert("Phiên live đã dừng lại nhưng lỗi chuyển file");
        });
      })
      .catch((error) => {
        alert("Bạn hiện không có phiên live nào cả");
      });

    })
    .catch((error) => {
      console.log(error);
    });
  });
//////////////////////////////////////////////////////////////////////
  const taoMoiKey = ((e) => {
    if(isStream == true){
      alert("Bạn đang có phiên live stream vui lòng tắt phiên live trước khi tạo lại key");
    }
    else{
      var username = window.localStorage.getItem("username")
      let data = JSON.stringify({
        "username": username,
        "mayChu": 1
      });
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'http://localhost:8081/stream-key/update-key',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  })


  /////////////////////////////////////////////////
  useEffect (() => {
    var username = window.localStorage.getItem("username");
    setUrlVideoStream("http://localhost:8080/hls/"+username+".m3u8");
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/stream-key/find-by-username/'+username,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(response.data);
      var duLieu = response.data
      setStreamKey(username+"?key="+duLieu.strkey+"_"+username);
      setMcRTMP(duLieu.maychu_id.linkServer);
    })
    .catch((error) => {
      alert("bạn chưa có key live stream hãy tạo mới key của bạn");
    });

    let config1 = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/video/getVideoStream/'+username,
      headers: { }
    };
    
    axios.request(config1)
    .then((response) => {
      const apiTimeString = response.data.date;
      const formattedTime = moment(apiTimeString).format('YYYY-MM-DD HH:mm:ss');
      setNameLive(response.data.name);
      setUrl(response.data.url);
      setDate(formattedTime);
      setView("10");
      setIsStream(true);
    })
    .catch((error) => {
    });
    layThongTinNguoiDung();
  },[])
////////////////////////////////////////////////////////
  return (
    <div className="App">
      <Header/>
      <div className="main-display">
      <Sidebar/>
      <div style={{"width" : "85%","float" : "right"}}>
        <VideoPlay urlLive={urlVideoStream}/>
        <div className='set-up-live'>
            <div>
                <label>Tên live</label>
                <input type='text' value={nameLive} placeholder='hãy nhập tên live' onChange={(e) => {setNameLive(e.target.value)}}/>
            </div>
            <div>
                <label>Stream-key</label>
                <input type='text' value={streamKey}/>
            </div>
            <div>
            <label>Máy chủ RTMP</label>
                <input type='text' value={mcRTMP}/>
            </div>
            <button onClick={taokey}>Tạo key</button>
            <button onClick={taoMoiKey}>Làm mới key</button>
            <button onClick={themVideo}>Bắt đầu stream</button>
            <button onClick={tatphienlive}>Kết thúc stream</button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default SetUpLive;