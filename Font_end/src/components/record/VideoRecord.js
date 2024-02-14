// import './VideoRecord.css';
import '../pageLiveStream/PageLiveStream.css'
import Header from '../header/Header';
import Sidebar from '../slidebar/Sidebar';
import VideoPlay from '../videoPlay/VideoPlay';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BaoCao from '../baoCao/BaoCao';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function VideoRecord() {
  // const socket = io.connect("http://localhost:3001");
  const [nameUserLive, setNameUserLive] = useState("");
  const [socket,setSocket] = useState();
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [urlVideoStream, setUrlVideoStream] = useState ("http://localhost:8080/hls/datbttb.m3u8");
  const [nameLive, setNameLive] = useState("Cùng nhau chơi liên minh huyền thoại");
  // const imagePath = require(`../../images/datbttb.jpg`);
  const anhLike = require('../../images/pngegg.png');
  const anhDislike = require('../../images/dislike.png');
  const [isSocket, setIsSocket] = useState(false);
  const [isTheoDoi, setIsTheoDoi] = useState(false);
  const [isMyStream, setIsMyStream] = useState(false);
  const [isPopupBaoCao,setIsPopupBaoCao] = useState(false);
  const [isLiked, setIsLike] = useState(false);
  const [isDisliked, setIsDislike] = useState(false);
  const [urlVideoDB, setUrlVideoDB] = useState();
  const [isLoadingTuongTac, setIsLoadingTuongTac] = useState(false);
  const [slLike,setSlLike] = useState(0);
  const [slDislike,setSlDislike] = useState(0);
  const [slFollow, setSlFollow] = useState(0);
  const [isSlFollow, setIsSlFollow] = useState(false);
  // const [isLoadTuongTac, setIsLoadTuongTac] = useState()
  const navigate = useNavigate();

  function moPoPUp () {
    if (window.localStorage.getItem("username")){
      setIsPopupBaoCao(!isPopupBaoCao);
    }
    else{
      alert("vui lòng đăng nhập để thực hiện chức năng này");
    }
  };

  const getSlFollow = (username) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/follow/so-nguoi-follow/'+username,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      setSlFollow(response.data);
      setIsSlFollow(true);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  //Theo dõi người dùng
  const theoDoi = (e) =>{
    const follow = window.localStorage.getItem("username");
    var following = window.location.pathname.split("/")[2];
    let data = JSON.stringify({
        "userFollow": follow,
        "userFollowing": nameUserLive
      });

    let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:8081/follow/add-follow',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };
    
    axios.request(config)
    .then((response) => {
        setIsTheoDoi(true);
    })
    .catch((error) => {
        console.log(error);
        alert("Lỗi mong ban thử lại")
    });
}
 // Bỏ theo dõi người dùng
const boTheoDoi = (e) => {
    const follow = window.localStorage.getItem("username");
    var following = window.location.pathname.split("/")[2];
    let data = JSON.stringify({
        "userFollow": follow,
        "userFollowing": nameUserLive
      });
      
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: 'http://localhost:8081/follow/delete-follow',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
    
    axios.request(config)
    .then((response) => {
        setIsTheoDoi(false);
    })
    .catch((error) => {
        console.log(error);
        alert("Lỗi mong ban thử lại")
    });
}

/// Trang cá nhân
  const dieuHuongTrangCaNhan = (e) => {
    const username = window.localStorage.getItem("username");
    navigate("/channel/"+username);
    window.location.reload();
  }

/// Check follow
  const checkFollow = (follow, following) => {
    let data3 = JSON.stringify({
      "userFollow": follow,
      "userFollowing": following
    });
    let config3 = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/follow/check-follow-user-user',
      headers: { 
          'Content-Type': 'application/json'
      },
      data : data3
  };
  axios.request(config3)
  .then((response) => {
      console.log(JSON.stringify(response.data));
      if(response.data==true){
          setIsTheoDoi(true);
      }
      else{
          setIsTheoDoi(false);
      }
  })
  .catch((error) => {
      console.log(error);
  });
  }

///Check tương tác
  const getTuongTac = () => {
    var paths = window.location.pathname.split("/");
    var nguoidangnhap = window.localStorage.getItem("username");
    var urlVideo = paths[2];
    // console.log(urlVideo);
    let data = JSON.stringify({
      "trangThai": 0,
      "username": nguoidangnhap,
      "url": urlVideo 
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/tuong-tac/get-video-url-username',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      setIsLoadingTuongTac(true);
      if(response.data.trangThai == 1){
        setIsLike(true);
      }
      else if(response.data.trangThai == 0){
        setIsDislike(true);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const getSlTuongTac = () => {
    var paths = window.location.pathname.split("/");
    var urlVideo = paths[2];
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/tuong-tac/so-luot-tuong-tac/'+urlVideo,
      headers: { }
    };
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setSlLike(response.data[0]);
      setSlDislike(response.data[1]);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const addTuongTac = (trangThai) => {
    // var paths = window.location.pathname.split("/");
    var nguoidangnhap = window.localStorage.getItem("username");
    var urlVideo = urlVideoDB;
    let data = JSON.stringify({
      "trangThai": trangThai,
      "username": nguoidangnhap,
      "url": urlVideo 
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/tuong-tac/add-tuong-tac',
      headers: { 
        'Content-Type': 'application/json'
      },
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

  const updateTuongTac = (trangThai) => {
    // var paths = window.location.pathname.split("/");
    var nguoidangnhap = window.localStorage.getItem("username");
    var urlVideo = urlVideoDB;
    let data = JSON.stringify({
      "trangThai": trangThai,
      "username": nguoidangnhap,
      "url": urlVideo
    });
    
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/tuong-tac/update-tuong-tac',
      headers: { 
        'Content-Type': 'application/json'
      },
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

  const deleteTuongTac = () => {
    // var paths = window.location.pathname.split("/");
    var nguoidangnhap = window.localStorage.getItem("username");
    var urlVideo = urlVideoDB;
    let data = JSON.stringify({
      "trangThai": 0,
      "username": nguoidangnhap,
      "url": urlVideo
    });
    
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/tuong-tac/delete-tuong-tac',
      headers: { 
        'Content-Type': 'application/json'
      },
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

  const handleLikeClick = (e) => {
    if (window.localStorage.getItem("username")) {
      if(isLiked == true){
        deleteTuongTac();
        setIsLike(false);
        setSlLike(slLike-1);
      }
      else if(isDisliked == true){
        updateTuongTac(1);
        setIsDislike(false);
        setIsLike(true);
        setSlLike(slLike+1);
        setSlDislike(slDislike-1);
      }
      else{
        addTuongTac(1);
        setIsLike(true);
        setSlLike(slLike+1);
      }
    } else {
      alert("Vui lòng đăng nhập để sử dụng tính năng này");
    }
  }

  const handleDislikeClick = (e) => {
    if (window.localStorage.getItem("username")) {
      if(isDisliked == true){
        deleteTuongTac();
        setIsDislike(false);
        setSlDislike(slDislike-1);
      }
      else if(isLiked == true){
        updateTuongTac(0);
        setIsDislike(true);
        setIsLike(false);
        setSlDislike(slDislike+1);
        setSlLike(slLike+1);
      }
      else{
        addTuongTac(0);
        setIsDislike(true);
        setSlDislike(slDislike+1);
      }
    } else {
      alert("Vui lòng đăng nhập để sử dụng tính năng này");
    }
  }

  useEffect(() => {
    var paths = window.location.pathname.split("/");
    var nguoidangnhap = window.localStorage.getItem("username");
    var urlVideo = paths[2];
    setUrlVideoDB(urlVideo);
    setUrlVideoStream("http://localhost:8080/recorddata/"+urlVideo+"/index.m3u8");

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/video/getvideobyUrl/'+urlVideo,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      var dlvideo = response.data;
      var nguoidung = dlvideo.key_id.user_id.username;
      if(nguoidung == nguoidangnhap){
        setIsMyStream(true);
      }
      setNameLive(dlvideo.name);
      setNameUserLive(nguoidung);
      setShowChat(true);
      checkFollow(nguoidangnhap,nguoidung);
      getSlFollow(nguoidung);
    })
    .catch((error) => {
      console.log(error);
    });
    getTuongTac();
    getSlTuongTac();
  },[]);


  return (
    <div className="App">
      {isPopupBaoCao ? (
        <BaoCao props={moPoPUp} urlVideo={urlVideoDB}/>
      ):(
        <div></div>
      )}
      <Header/>
      <div className="main-display">
      <Sidebar/>
      <div style={{"width" : "85%","float" : "right"}}>
        <div className='video-player'>
        {showChat ? (<div>
              <VideoPlay urlLive={urlVideoStream}/>
            </div>) : (
              <div></div>
            )}
          <div className='thong-tin-tuong-tac'>
            <h1>{nameLive}</h1>
            <div className='thong-tin'>
              <div className='tom-tat-kenh'>
                <img style={{"width" :"50px","height":"50px", "border-radius": "50%", "overflow": "hidden"}} src={"http://localhost:8081/upfile/getimg/"+nameUserLive+".jpg"}/>
                {isSlFollow ? (
                  <div className='thong-tin-user'>
                    <h1>{nameUserLive}</h1>
                    <p>{slFollow} người đã đăng ký</p>
                  </div>
                ):(
                  <div></div>
                )}
                <div className='dang-ky-kenh'>
                  {isMyStream ? (
                    <div>
                      <button onClick={dieuHuongTrangCaNhan}>Trang cá nhân</button>
                    </div>
                  ):(
                    <div>
                      {isTheoDoi ? (
                        <div>
                          <button onClick={boTheoDoi}>Bỏ theo dõi</button>
                        </div>
                      ):(
                        <button onClick={theoDoi}>Theo dõi</button>
                      )}
                    </div>
                  )}
                  
                </div>
              </div>
              {isLoadingTuongTac ? (
                <div className='tuong-tac'>
                  <div>
                    <button onClick={handleLikeClick} style={{background:'white', border:'none'}}>
                      <FontAwesomeIcon icon={faThumbsUp} style={{ color: isLiked ? 'blue' : 'gray' , height:'30px', width:'30px'}} />
                    </button>
                    <span>{slLike}</span>
                  </div>
                  <div>
                    <button onClick={handleDislikeClick} style={{background:'white', border:'none', marginLeft:'10px'}}>
                      <FontAwesomeIcon icon={faThumbsDown} style={{ color: isDisliked ? 'blue' : 'gray' , height:'30px', width:'30px', transform:'rotateY(180deg)'}} />
                    </button>
                    <span>{slDislike}</span>
                  </div>
                  <div className='pglive-stream-bao-cao'>
                    <button onClick={moPoPUp}>Báo vi phạm</button>
                  </div>
                </div>
              ):(
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default VideoRecord;