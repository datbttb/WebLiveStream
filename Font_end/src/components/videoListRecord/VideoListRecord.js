import "./VideoListRecord.css"
import Header from "../header/Header";
import Sidebar from "../slidebar/Sidebar";
import Videos from "../video/Videos";
import React, { useEffect, useState } from "react";
import SingleVideo from "../video/SingleVideo";
import axios from "axios";

function VideoListRecord() {

    // const navigate = useNavigate();
    const [listRecord,setListRecord] = useState([]);
    const [isLoadingRecord, setIsLoadingRecord] = useState(false);
    const [listVideoAll,setListVideoAll] = useState();
    // const [listLiveStream, setListLiveStream] = useState([]);
    // const [isLoadingLive,setIsLoadingLive] = useState(false);

    // const xemVideo = (e) =>{
    //     navigate("/live/datbttb");
    // }

    const handleHienThiThemClick = (e) => {
        const dsvideo = listVideoAll;
        var slvideo = dsvideo.length;
        var slvideodaco = listRecord.length;
        var macdinh = 6;
        if(macdinh >= slvideo-slvideodaco ){
            macdinh = slvideo-slvideodaco;
        }
        for (let i = 0; i < macdinh; i++) {
        const video = {
            videoname:dsvideo[slvideo-slvideodaco-i-1].name,
            videourl:dsvideo[slvideo-slvideodaco-i-1].url,
            videousername:dsvideo[slvideo-slvideodaco-i-1].key_id.user_id.username
            
        };
        setListRecord((listold) => [...listold, video]);
        }
    }

    const getListRecord = () =>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/video/getvideobyTrangThai/0',
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
                const dsvideo = response.data;
                setListVideoAll(dsvideo);
                // console.log(dsvideo[0]);
                var slvideo = dsvideo.length;
                var macdinh = 6;
                if(macdinh >= dsvideo.length ){
                    macdinh = dsvideo.length;
                }
                for (let i = 0; i < macdinh; i++) {
                    const video = {
                        videoname:dsvideo[slvideo-1-i].name,
                        videourl:dsvideo[slvideo-1-i].url,
                        videousername:dsvideo[slvideo-1-i].key_id.user_id.username
                        
                    };
                    // console.log(video);
                    setListRecord((listold) => [...listold, video]);
                }
                setIsLoadingRecord(true);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    useEffect (() => {
        getListRecord();
    },[]);

    return (
      <div className="App">
        <Header/>
        <div className="main-display">
        <Sidebar/>
            <div className="videos-trang-chu">
            <div className="videos-xem-lai">
                <h2>Xem lại</h2>
                {isLoadingRecord ? (
                    <div className="row">
                        {listRecord.map((item) => (
                            <SingleVideo 
                            profile_img={"http://localhost:8081/upfile/getimg/"+item.videousername+".jpg"}
                            title={item.videoname}
                            channel_name={item.videousername}
                            urlVideo={item.videourl}
                            islive={0}
                            />
                        ))}
                    </div>
            ):(
                    <div></div>
                )}
            <div className="danglive-xem-them">
                <div className="middle-line"></div>
                <button className="btn-danglive-xem-them" onClick={handleHienThiThemClick}>Hiển thị thêm</button>
            </div>
            </div>
            </div>
        </div>
      </div>
    );
}
export default VideoListRecord;