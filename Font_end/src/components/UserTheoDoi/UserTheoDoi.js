import { useEffect, useState } from "react"
import "./UserTheoDoi.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../slidebar/Sidebar";

function UserTheoDoi () {
    const [isLoading, setIsLoading] = useState(false);
    const [listUser,setListUser] = useState([]);
    const [listUserAll, setListUserAll] = useState();
    const navigate = useNavigate();

    const handleHienThiThem = (e) => {
        const dsUserAll = listUserAll;
        var toida=18;
        if(toida > dsUserAll.length - listUser.length){
            toida = dsUserAll.length- listUser.length;
        }
        for(let i=0; i<toida; i++){
            const userItem = {
                username:dsUserAll[dsUserAll.length-listUser.length-1-i].username
            }
            setListUser((listold) => [...listold,userItem]);
        }
    }

    const handleClickUser = (username) => {
        navigate("/channel/"+username);
        window.location.reload();
    }

    const getListUser = () => {
        const userUsed = window.localStorage.getItem("username");
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/follow/get-ds-nguoi-follow/'+userUsed,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            setIsLoading(true);
            const dsUserAll = response.data;
            setListUserAll(dsUserAll);
            var toida=18;
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

    useEffect (() => {
        getListUser();
    },[]);

    return (
        <div className="user-theo-doi">
            <div className="App">
                <Header/>
                <div className="main-display">
                <Sidebar/>
                <div className="videos-trang-chu">
                    <div className="list-user">
                        <h2>Danh sách người theo dõi</h2>
                        {isLoading ? (
                            <div className="row">
                                {
                                listUser.map((item) => (
                                    <div className="user-item col-2" onClick={(e) => {handleClickUser(item.username)}}>
                                        <img src={"http://localhost:8081/upfile/getimg/"+item.username+".jpg"}/>
                                        <p>{item.username}</p>
                                    </div>
                                ))
                                }
                            </div>
                            ):(
                                <div></div>
                            )}
                        <div className="danglive-xem-them">
                            <div className="middle-line"></div>
                            <button className="btn-danglive-xem-them" onClick={handleHienThiThem}>Hiển thị thêm</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default UserTheoDoi;