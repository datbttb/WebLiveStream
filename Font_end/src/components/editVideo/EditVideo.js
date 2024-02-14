import './EditVideo.css';
import Header from '../header/Header';
import Sidebar from '../slidebar/Sidebar';
import VideoPlay from '../videoPlay/VideoPlay';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'bootstrap';
import moment from 'moment/moment';

function EditVideo() {

    const [urlVideoStream, setUrlVideoStream] = useState("http://localhost:8080/hls/adbi.m3u8");
    const [nameVideo, setNameVideo] = useState("");
    const [urlVideo, setUrlVideo] = useState("");
    const [vddate,setvddate] = useState("");


    const getVideo = (urlVideo) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/video/getvideobyUrl/TraiLer1',
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
    }


  return (
    <div className='edit-video'>
    <div className="App">
      <Header/>
      <div className="main-display">
      <Sidebar/>
      <div style={{"width" : "85%","float" : "right", "display":"flex"}}>
        <VideoPlay urlLive={urlVideoStream}/>
        <div className='thong-tin-video'>
            <div>
                <label>Tên live</label>
                <input type='text'placeholder='hãy nhập tên live'/>
            </div>
            <div>
                <label>Url</label>
                <input type='text'/>
            </div>
            <div>
                <label>Ngày tạo</label>
                <input type='text'/>
            </div>
            <div>
                <label>Người sở hữu</label>
                <input type='text'/>
            </div>
            <div>
                <label>Trạng thái</label>
                <input type='text'/>
            </div>
            <button>Lưu</button>
            <button>Xóa</button>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
}

export default EditVideo;