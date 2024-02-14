import { useEffect, useState } from "react";
import "./Search.css"
import axios from "axios";
import SingleVideo from "../video/SingleVideo";

function SearchAll({searchKey}){

    const [isLoadingLive, setIsLoadingLive] = useState(false);
    const [listVideoLive, setlistVideoLive] = useState([]);
    const [listVideoLiveAll, setlistVideoLiveAll]  = useState([]);

    const [isLoadingRecord, setIsLoadingRecord] = useState(false);
    const [listVideoRecord, setListVideoRecord] = useState([]);
    const [listVideoRecordAll, setListVideoRecordAll]  = useState([]);

    const [isLoadingUser, setIsLoadingUser] = useState(false);
    const [listUser,setListUser] = useState([]);
    const [listUserAll, setListUserAll] = useState();

    const getListUser = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/user/search-by-username'+searchKey,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            setIsLoadingUser(true);
            const dsUserAll = response.data;
            setListUserAll(dsUserAll);
            var toida=6;
            if(toida > dsUserAll.length){
                toida = dsUserAll.length;
            }
            for(let i=0; i<toida; i++){
                const userItem = {
                    username:dsUserAll[dsUserAll.length-1-i].username
                }
                setListUser((listold) => [...listold,userItem]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
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
            setIsLoadingRecord(true);
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
            setIsLoadingLive(true);
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
        getListUser();
        getListVideoRecord();
        getlistVideoLive();
    },[]);

    return(
        <div>
            <div className="videos-trang-chu">
                <div className="videos-dang-live">
                <h2>Đang live</h2>
                {isLoadingLive ? (
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
                </div>
            </div>
            <div className="videos-trang-chu">
                <div className="videos-dang-live">
                <h2>Xem lại</h2>
                {isLoadingRecord ? (
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
                </div>
            </div>
            <div className="videos-trang-chu">
                <div className="list-user">
                    <h2>Danh sách người dùng</h2>
                    {isLoadingUser ? (
                    <div className="row">
                        <div className="user-item col-2">
                            <img src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg"/>
                            <p>Datbttb</p>
                        </div>
                        {
                        listUser.map((item) => (
                            <div className="user-item col-2">
                                <img src={"http://localhost:8081/upfile/getimg/"+item.username+".jpg"}/>
                                <p>{item.username}</p>
                            </div>
                        ))
                        }
                    </div>
                    ):(
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchAll;