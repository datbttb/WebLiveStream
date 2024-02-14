import React, { useEffect, useState } from "react";
import "./Videos.css";
import Filter from "./Filter";
import SingleVideo from "./SingleVideo";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// function Videos() {
//     return (
//         <div className="videos">
//             <div className="row">
//                 <div className="video-streaming">
//                     <ReactPlayer
//                         controls={true} 
//                         playing
//                         loop
//                         url="http://localhost:8080/hls/adbi.m3u8"
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// }

function Videos() {
    const navigate = useNavigate();
    const [listRecord,setListRecord] = useState([]);
    const [isLoadingRecord, setIsLoadingRecord] = useState(false);
    const [listLiveStream, setListLiveStream] = useState([]);
    const [isLoadingLive,setIsLoadingLive] = useState(false);

    const xemVideo = (e) =>{
        navigate("/live/datbttb");
    }

    const handleListVideoLive = (e) => {
        navigate("/video-list/video-live");
    }
    
    const handleListVideoRecord = (e) => {
        navigate("/video-list/video-record");
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
                // console.log(dsvideo[0]);
                var macdinh = 3;
                if(macdinh >= dsvideo.length ){
                    macdinh = dsvideo.length;
                }
                for (let i = dsvideo.length-3; i < dsvideo.length; i++) {
                    const video = {
                        videoname:dsvideo[i].name,
                        videourl:dsvideo[i].url,
                        videousername:dsvideo[i].key_id.user_id.username
                        
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
        getListRecord();
        getListLiveStream();
    },[]);

    return (
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
                <button className="btn-danglive-xem-them" onClick={handleListVideoLive}>Xem tất cả</button>
            </div>
            </div>
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
                <button className="btn-danglive-xem-them" onClick={handleListVideoRecord}>Xem tất cả</button>
            </div>
            </div>
        </div>
    )
}
export default Videos



//ban Mau
// function Videos() {
//     return (
//         <div className="videos">
//             <Filter />
//             <div className="row">
//                 <SingleVideo 
//                  thumb_img="https://i.ytimg.com/vi/78uSkHH42IU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSUsgncPb84K_zEOdU_VzC1bkfjA" 
//                 profile_img="https://yt3.ggpht.com/ytc/AMLnZu9vk_jSZZqpKOw6TohZDkc4e2ekKVYPlcioQjttfQ=s176-c-k-c0x00ffffff-no-rj-mo"
//                 title="React Full Course 2022"
//                 channel_name="Simplilearn"
//                 video_duration="5:33:29"
//                 />
//             </div>
//         </div>
//     )
// }