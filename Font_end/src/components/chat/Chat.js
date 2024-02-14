import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import './Chat.css'

function Chat({ socket, username, room}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const imagePath = "http://localhost:8081/upfile/getimg/"+username+".jpg"

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    try {
      socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data]);
      });
    } catch (error) {
      console.log(error);
    }
  }, [socket]);

  return (
    <div className="khung-chat">
      <div className="chat-window">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                >
                  <div className="img-user-chat">
                    <img className="user-img-chat" src={"http://localhost:8081/upfile/getimg/"+messageContent.author+".jpg"}/>
                  </div>
                  <div className="name-user-chat">
                    <p>{messageContent.author}</p>
                  </div>
                  <div className="content-chat">
                    <p>{messageContent.message}</p>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;