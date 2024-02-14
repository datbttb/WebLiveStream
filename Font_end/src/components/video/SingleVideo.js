import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
function SingleVideo({thumb_img, profile_img, title, channel_name, islive, timestamps, video_duration, urlVideo }) {

    const navigate = useNavigate();
    const [urlLive, setUrlLive] = useState("http://localhost:8080/recorddata/"+urlVideo+"/index.m3u8");
    const clickVideo = (e) =>{
        if(islive==0){
            navigate("/record/"+urlVideo);
        }
        else{
            navigate("/live/"+urlVideo);
        }
        window.location.reload();
    }

    useEffect (() => {
        if(islive==1){
            setUrlLive("http://localhost:8080/hls/"+urlVideo+".m3u8");
        }
    },[]);

    // return(
    //     <div className="single-video col-4" style={{"margin-top": "5px"}} onClick={clickVideo}>
    //         <div className="thumbnail_img relative">
    //             <img src ={thumb_img} alt="" 
    //             className="thumb-img pointer" 
    //             style={{"width": "100%"}}
    //             />
    //             <span className="videos_duration absolute">
    //                 {video_duration}
    //             </span>
    //         <div className="description_option d-flex">
    //             <div className="profile_img">
    //                 <img src={profile_img}
    //                 className="channel_image pointer"
    //                 />
    //             </div>
    //             <div className="title d-flex align-items-center justify-content-center">
    //                 <span className="channelname">
    //                     {channel_name}
    //                 </span>
    //                 <div className="time_description">
    //                     <span className="views">
    //                         {views}
    //                     </span>
    //                     <span className="timestamp">
    //                         {timestamps}
    //                     </span>
    //                 </div>
    //             </div>
    //         </div>
    //         <div style={{"height": "20px"}} className="single-video-tieu-de">
    //             <p>{title}</p>
    //             <p>Đang Live</p>
    //         </div>
    //         </div>
    //     </div>
    // )

    return(
        <div className="col-4" style={{"margin-top": "5px"}} onClick={clickVideo}>
            <div className="thumbnail_img relative">
                <ReactPlayer
                    url={urlLive}
                    className="thumb-img pointer" 
                    width="100%"
                    height="100%"
                />
            <div className="description_option d-flex">
                <div className="profile_img">
                    <img src={profile_img}
                    className="channel_image pointer"
                    />
                </div>
                <div className="title d-flex align-items-center justify-content-center">
                    <span className="channelname">
                        {channel_name}
                    </span>
                    <div className="time_description">
                        <span className="timestamp">
                            {timestamps}
                        </span>
                    </div>
                </div>
            </div>
            <div style={{"height": "20px"}} className="single-video-tieu-de">
                <p>{title}</p>
            </div>
            </div>
        </div>
    )
}
export default SingleVideo