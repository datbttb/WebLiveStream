import React, { useEffect, useState, useRef } from "react";
import "./VideoPlay.css";
import ReactPlayer from "react-player";

function VideoPlay({urlLive}) {

    const username = window.localStorage.getItem("username");

    // const url = `http://localhost:8080/hls/${username}.m3u8`;

    // const url = `http://localhost:8080/hls/datbttb.m3u8`;

    // const playerRef = useRef(null);

    // useEffect(() => {
    //     // Auto-seek to the end of the video when the component mounts
    //     playerRef.current.seekTo(playerRef.current.getDuration(), 'seconds');
    //     // Auto-play the video when the component mounts
    //     playerRef.current.play();

    // }, []);


    return (
        <div className="video-streaming">
            <ReactPlayer
                controls={true} 
                loop
                url={urlLive}
            />
        </div>
    )
}

export default VideoPlay;