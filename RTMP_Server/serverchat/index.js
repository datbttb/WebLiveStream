const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { Socket } = require("dgram");
app.use(cors());

const server = http.createServer(app);
const countUsers = {};
const roomUsers = {};
const coutView = {};

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
//   socket.to(data.room).emit("so_nguoi_xem", countUsers[data])


  socket.on("join_room", (data) => {
    roomUsers[socket.id] = data
    if (!countUsers[data]) {
      countUsers[data] = 1;
    } else {
      countUsers[data]++;
    }
    if (!coutView[data]) {
        coutView[data] = 1;
    } else {
        coutView[data]++;
    }
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
    console.log(countUsers[[data]]);
    // socket.to(data.room).emit("so_nguoi_xem", countUsers[data]);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    // socket.to(roomUsers[socket.id]).emit("so_nguoi_xem", countUsers[roomUsers[socket.id]]);
  });

  socket.on("so_luong_nguoi_xem", (data) => {
    socket.to(data).emit("so_nguoi_xem", countUsers[data]);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    if(roomUsers[socket.id]){
        countUsers[roomUsers[socket.id]] --;
        socket.to(roomUsers[socket.id]).emit("so_nguoi_xem", countUsers[roomUsers[socket.id]]);
    }
    console.log(countUsers[roomUsers[socket.id]]);
  });
});

// app.post("/auth", async function (req, res) {
//     res.status(200).send(countUsers);
// });

app.post("/slnguoixem", async function (req, res) {
    const room = req.query.room+"";
    const sol= countUsers[room]+"";
    res.status(200).send(sol);
});

app.post("/slview", async function(req, res){
    const room = req.query.room+"";
    if(coutView[room]){
      const sol= coutView[room]+"";
      res.status(200).send(sol);
    }
    else{
      res.status(200).send(0);
    }
});

app.post("/testserver", async function(req, res){
    res.status(200).send("Test ok");
});

app.post("/startstream", async function(req, res){
  const room = req.query.room+"";
  coutView[room]= 0;
  countUsers[data] = 0;
  const giatri = coutView[room];
  res.status(200).send(giatri);
});


server.listen(3001, () => {
  console.log("SERVER RUNNING");
});