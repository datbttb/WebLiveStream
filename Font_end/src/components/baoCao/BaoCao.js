import { useState } from "react";
import "./BaoCao.css"
import axios from "axios";

function BaoCao ({props,urlVideo}){

    const [textPhanHoi, setTextPhanHoi] = useState("");

    const handleNopClick = (e) => {
        if(textPhanHoi == ""){
            alert("Vui lòng nhập phản hồi");
        }
        else{
            const userPhanHoi = window.localStorage.getItem("username");
            let data = JSON.stringify({
                "username": userPhanHoi,
                "urlVideo": urlVideo,
                "noiDung": textPhanHoi,
                "trangThaiBC": 1,
                "ngayBaoCao":"2001-08-23"
              });
              
              let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:8081/baocao/add-bao-cao',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              
              axios.request(config)
              .then((response) => {
                alert("Đã báo cáo thành công");
                props();
              })
              .catch((error) => {
                console.log(error);
              });
        }
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Báo cáo</h2>
                <div className="popup-nhap-bao-cao">
                    <textarea onChange={(e) => {setTextPhanHoi(e.target.value)}}/>
                </div>
                <button type="button" onClick={handleNopClick}>Nộp</button>
                <button type="button" onClick={props}>Close</button>
            </div>
        </div>
    )
}

export default BaoCao;