import "./Channel.css"
// import "../pageLiveStream/PageLiveStream.css"
import Header from "../header/Header";
import Sidebar from "../slidebar/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SingleVideo from "../video/SingleVideo";
import axios from "axios";
function Channel() {

    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isMyPage, setIsMyPage] = useState(false);
    const navigate = useNavigate();
    const [urlImg, setUrlImg] = useState();
    const [listVideo, setListVideo] = useState([]);
    const [isMyVideoLoading, setIsMyVideoLoading] = useState(false);
    const [isTheoDoi, setIsTheoDoi] = useState(false);
    const [slFollow, setSlFollow] = useState(0);
    const [isSlFollow, setIsSlFollow] = useState(false);
    const [slDangFollow, setSlDangFollow] = useState(0);
    const [isSlDangFollow, setIsSlDangFollow] = useState(false);

    const editProFile = (e) => {
        navigate("/editprofile");
        window.location.reload();
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

    const getSlDangFollow = (username) => {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://localhost:8081/follow/so-nguoi-dang-follow/'+username,
          headers: { }
        };
        
        axios.request(config)
        .then((response) => {
          setSlDangFollow(response.data);
          setIsSlDangFollow(true);

        })
        .catch((error) => {
          console.log(error);
        });
    }

    /// Theo dõi người dùng
    const theoDoi = (e) =>{
        const follow = window.localStorage.getItem("username");
        var following = window.location.pathname.split("/")[2];
        let data = JSON.stringify({
            "userFollow": follow,
            "userFollowing": following
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

    const boTheoDoi = (e) => {
        const follow = window.localStorage.getItem("username");
        var following = window.location.pathname.split("/")[2];
        let data = JSON.stringify({
            "userFollow": follow,
            "userFollowing": following
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

    useEffect (() => {
        var username = window.location.pathname.split("/")[2];
        var data = ""
        var useron = window.localStorage.getItem("username");
        if(useron == username){
            setIsMyPage(true);
        }
        // Lấy thông tin người dùng
        var config = {
            method: "get",
            url: "http://localhost:8081/user/get-by-username/"+username,
            headers: {},
            data: data,
        };

        axios(config)
            .then(function (response) {
                setUser(response.data);
                setIsLoading(true);
                if(response.data.avatar == 'anhdep'){
                    setUrlImg("https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg");
                }
                else{
                    setUrlImg("http://localhost:8081/upfile/getimg/"+username+".jpg");
                }
                console.log(JSON.stringify(response.data.username));
            })
            .catch(function (error){
                console.log(error);
            });
        
        // Lấy thông tin video
        let config1 = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/video/videos-user/'+username,
            headers: { }
          };
          
          axios.request(config1)
          .then((response) => {
            if(response.data!="Khong co video"){
                console.log(JSON.stringify(response.data));
                const dsvideo = response.data;
                console.log(dsvideo[0]);
                for (let i = 0; i < dsvideo.length; i++) {
                    const video = {
                        videoname:dsvideo[i].name,
                        videourl:dsvideo[i].url
                    };
                    console.log(video);
                    setListVideo((listold) => [...listold, video]);
                }
            }
            setIsMyVideoLoading(true);
            // dsvideo.array.forEach(element => {
            //     const video = {
            //         videoname:element.name,
            //         videoid:element.id,
            //         videourl:element.url
            //     };
            //     setListVideo((listold) => [...listold, video]);
            // });
          })
          .catch((error) => {
            console.log(error);
          });

        //// Lấy thông tin follow
        let data3 = JSON.stringify({
            "userFollow": useron,
            "userFollowing": username
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
        getSlFollow(username);
        getSlDangFollow(username);
    }, []);

    return (
    <div className="App">
      <Header/>
      <div className="main-display">
      <Sidebar/>
        <div className="user-channel">
            <div class="header__wrapper">
                <header></header>
                <div class="cols__container">
                    {isLoading ? (
                        <div class="left__col">
                        <div class="img__container">
                            <img src={urlImg}/>
                            <span></span>
                        </div>
                        
                        <h2>{user.username}</h2>
                        <p>{user.email}</p> 
                        {(isSlFollow && isSlDangFollow) ? (
                            <ul class="about">
                                <li><span>{slFollow}</span>Followers</li>
                                <li><span>{slDangFollow}</span>Following</li>
                            </ul>
                        ):(
                            <div></div>
                        )}
                        </div>
                    ): ("")}
                    <div class="right__col">
                    <nav>
                        <ul>
                        <li><a href="">Videos</a></li>
                        </ul>
                        {isMyPage ? (
                        <div>
                            <button onClick={editProFile}>Chỉnh sửa trang cá nhân</button>
                        </div>
                        ):(
                        <div>
                            {isTheoDoi ? (
                                <div>
                                    <button onClick={boTheoDoi}>Bỏ theo dõi</button>
                                </div>
                            ):(
                                <div>
                                    <button onClick={theoDoi}>Theo dõi</button>
                                </div>
                            )}
                        </div>
                        )}
                    </nav>
                    {isMyVideoLoading == isLoading ? (
                    <div className="videos">
                        <div className="row">
                            {listVideo.map((item) => (
                                <SingleVideo 
                                thumb_img={"http://localhost:8081/upfile/getimg/"+item.videourl+".mp4.jpg"}
                                profile_img={"http://localhost:8081/upfile/getimg/"+user.username+".jpg"}
                                title={item.videoname}
                                channel_name={user.username}
                                video_duration=""
                                urlVideo={item.videourl}
                                />
                            ))}
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

export default Channel;