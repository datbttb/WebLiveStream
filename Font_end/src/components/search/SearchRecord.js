import { useEffect, useState } from "react"
import "./Search.css"
import axios from "axios";
import SingleVideo from "../video/SingleVideo";


function SearchRecord({searchKey}) {
    const [isLoading, setIsLoading] = useState(false);
    const [listVideoRecord, setListVideoRecord] = useState([]);
    const [listVideoRecordAll, setListVideoRecordAll]  = useState([]);

    const handleHienThiThemClick = (e) => {
        const dsvideo = listVideoRecordAll;
        var slvideo = dsvideo.length;
        var slvideodaco = listVideoRecord.length;
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
        setListVideoRecord((listold) => [...listold, video]);
        }
    }

    const getListVideoRecord = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/video/getnameandtrangthai'+searchKey+'&trangthai=0',
            headers: { }
          };
          axios.request(config)
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            const dsVideoRecord = response.data;
            setListVideoRecordAll(dsVideoRecord);
            setIsLoading(true);
            var slvideo = dsVideoRecord.length;
            var toida = 6;
            if(toida > dsVideoRecord.length){
                toida = dsVideoRecord.length;
            }
            for(let i=0; i<toida; i++){
                const video = {
                    videoname:dsVideoRecord[slvideo-i-1].name,
                    videourl:dsVideoRecord[slvideo-i-1].url,
                    videousername:dsVideoRecord[slvideo-i-1].key_id.user_id.username
                    
                };
                setListVideoRecord((listold) => [...listold,video]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }

    useEffect (() => {
        getListVideoRecord();
    },[])

    return (
        <div className="videos-trang-chu">
            <div className="videos-dang-live">
            <h2>Xem lại</h2>
            {isLoading ? (
                <div className="row">
                    {listVideoRecord.map((item) => (
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

export default SearchRecord;