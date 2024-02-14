import { useEffect, useState } from "react"
import "./Search.css"
import axios from "axios";
import SingleVideo from "../video/SingleVideo";


function SearchLive({searchKey}) {
    const [isLoading, setIsLoading] = useState(false);
    const [listVideoLive, setlistVideoLive] = useState([]);
    const [listVideoLiveAll, setlistVideoLiveAll]  = useState([]);

    const handleHienThiThemClick = (e) => {
        const dsvideo = listVideoLiveAll;
        var slvideo = dsvideo.length;
        var slvideodaco = listVideoLive.length;
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
        setlistVideoLive((listold) => [...listold, video]);
        }
    }

    const getlistVideoLive = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/video/getnameandtrangthai'+searchKey+'&trangthai=1',
            headers: { }
          };
          axios.request(config)
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            const dsVideoLive = response.data;
            setlistVideoLiveAll(dsVideoLive);
            setIsLoading(true);
            var slvideo = dsVideoLive.length;
            var toida = 6;
            if(toida > dsVideoLive.length){
                toida = dsVideoLive.length;
            }
            for(let i=0; i<toida; i++){
                const video = {
                    videoname:dsVideoLive[slvideo-i-1].name,
                    videourl:dsVideoLive[slvideo-i-1].url,
                    videousername:dsVideoLive[slvideo-i-1].key_id.user_id.username
                    
                };
                setlistVideoLive((listold) => [...listold,video]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }

    useEffect (() => {
        getlistVideoLive();
    },[])

    return (
        <div className="videos-trang-chu">
            <div className="videos-dang-live">
            <h2>Đang live</h2>
            {isLoading ? (
                <div className="row">
                    {listVideoLive.map((item) => (
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
                    <button className="btn-danglive-xem-them" onClick={handleHienThiThemClick}>Hiển thị thêm</button>
                </div>
            </div>
        </div>
    );
}

export default SearchLive;