import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";

function ThongTin({ socket, username, room }) {
  const [soNguoiXem,setSoNguoiXem] = useState("111");
  const [isDaNhan,setIsDaNhan] = useState(true); 

  const sendMessage = async () => {
    await socket.emit("so_luong_nguoi_xem", room);
  };

  useEffect(() => {
    try {
      let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:3001/slnguoixem?room='+room,
          headers: { }
        };
        
        axios.request(config)
        .then((response) => {
          setSoNguoiXem(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      sendMessage();
      socket.on("so_nguoi_xem", (data) => {
          setSoNguoiXem(data);
      });
    } catch (error) {
      console.log(error);
    }
  },[socket]);

  return (
    <div>
        <p>{soNguoiXem} người đang xem</p>
    </div>
  );
}

export default ThongTin;