import "./VideoLive.css"
import Header from "../header/Header";
import Sidebar from "../slidebar/Sidebar";
import Videos from "../video/Videos";
import React, { useEffect, useState } from "react";
import SingleVideo from "../video/SingleVideo";
import axios from "axios";

function VideoLive() {

    // const navigate = useNavigate();
    // const [listRecord,setListRecord] = useState([]);
    // const [isLoadingRecord, setIsLoadingRecord] = useState(false);
    const [listLiveStream, setListLiveStream] = useState([]);
    const [isLoadingLive,setIsLoadingLive] = useState(false);
    const [listVideoAll, setListVideoAll] = useState();
    // const xemVideo = (e) =>{
    //     navigate("/live/datbttb");
    // }

    const handleHienThiThemClick = (e) => {
        const dsvideo = listVideoAll;
        var slvideo = dsvideo.length;
        var slvideodaco = listLiveStream.length;
        var macdinh = 6;
        if(macdinh >= slvideo-slvideodaco ){
            macdinh = slvideo-slvideodaco;
        }
        for (let i = 0; i < macdinh; i++) {
        const video = {
            videoname:dsvideo[slvideo-slvideodaco-i].name,
            videourl:dsvideo[slvideo-slvideodaco-i].url,
            videousername:dsvideo[slvideo-slvideodaco-i].key_id.user_id.username
            
        };
        setListLiveStream((listold) => [...listold, video]);
        }
    }


    const getListLiveStream = () =>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/video/getvideobyTrangThai/1',
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
                const dsvideo = response.data;
                // console.log(dsvideo[0]);
                setListVideoAll(dsvideo);
                var macdinh = dsvideo.length-3;
                if(macdinh <=0){
                    macdinh = 0;
                }
                for (let i=macdinh; i < dsvideo.length; i++) {
                    const video = {
                        videoname:dsvideo[i].name,
                        videourl:dsvideo[i].url,
                        videousername:dsvideo[i].key_id.user_id.username
                    };
                    // console.log(video);
                    setListLiveStream((listold) => [...listold, video]);
                }
                setIsLoadingLive(true);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    useEffect (() => {
        getListLiveStream();
    },[]);

    return (
      <div className="App">
        <Header/>
        <div className="main-display">
        <Sidebar/>
            <div className="videos-trang-chu">
                <div className="videos-dang-live">
                <h2>Đang live</h2>
                {isLoadingLive ? (
                    <div className="row">
                        {listLiveStream.map((item) => (
                            <SingleVideo 
                            profile_img={"http://localhost:8081/upfile/getimg/"+item.videousername+".jpg"}
                            title={item.videoname}
                            channel_name={item.videousername}
                            urlVideo={item.videousername}
                            islive={1}
                            />
                        ))}
                    </div>
                ):(
                    <div>
                        <p>Hiện không có live nào</p>
                    </div>
                )}
                <div className="danglive-xem-them">
                    <div className="middle-line"></div>
                    <button className="btn-danglive-xem-them">Hiển thị thêm</button>
                </div>
                </div>
            </div>
        </div>
      </div>
    );
}
export default VideoLive;