const express = require('express');
const app = express();
app.use(express.urlencoded());
const axios = require('axios');
const ffmpeg = require('ffmpeg-static');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg1 = require('fluent-ffmpeg');
ffmpeg1.setFfmpegPath(ffmpegPath);

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());


let a=[];
let kt=1;

// app.use(bodyParser.json());

// console.log("OK");

// axios.get('http://localhost:8081/stream-key/find-by-username/datbttb')
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// app.post("/auth",async function(req, res){
//     const streamkey = req.body.key;
//     const key = streamkey.split('_')[0];
//     const username =streamkey.split('_')[1];

//     axios.get('http://serverapi:8081/stream-key/find-by-username/'+username)
//     .then(response => {
//         var streamkey = response.body;
//         if(key === streamkey.strkey) {
//             res.status(200).send("Ok");
//             return;
//         }
//         res.status(403).send("khong tin thay key");  
//     })
//     .catch(error => {
//         res.status(403).send("gap loi");  
//     });
//     res.status(403).send("gap loi");  
// });

app.post("/auth", async function (req, res) {
  try {
    const streamkey = req.body.key;
    const key = streamkey.split('_')[0];
    const username = streamkey.split('_')[1];
    const response = await axios.get('http://serverapi:8081/stream-key/find-by-username/' + username);
    var streamkeyFromServer = response.data;
    if (key === streamkeyFromServer.strkey) {
      res.status(200).send("Ok");
    } else {
      res.status(403).send("Không tìm thấy key");
    }
  } catch (error) {
    res.status(403).send("Gặp lỗi");
  }
});

// app.post("/offstream",bodyParser.json(), async function (req, res) {
//   const currentDir = __dirname;
//   const directory = path.resolve(currentDir, '/record');
//   const directorynew = path.resolve(currentDir, '/record-data');
//   const searchString = req.body.nameold;
//   const newFileName = req.body.namenew+'.mp4';
//   console.log(directory);
//   fs.readdir(directory, (err, files) => {
//       if (err) {
//           console.error('Error reading directory:', err);
//           return;
//       }

//       files.forEach(file => {
//           if (file.startsWith(searchString)) {
//               const oldFilePath = path.join(directory, file);
//               const newFilePath = path.join(directorynew, newFileName);
//               //Lấy ảnh
//               const videoPath = oldFilePath; // Thay đổi đường dẫn tới video của bạn
//               const outputPath = path.resolve(currentDir, '/imgsvideo/'+newFileName+'.jpg');
//               captureFirstFrame(videoPath, outputPath);
//               //Chuyển file
//               fs.copyFile(oldFilePath, newFilePath, (err) => {
//                 if (err) {
//                   console.error('Error copying file:', err);
//                   res.status(200).send("Khong doi duoc");
//                 } else {
//                   console.log('File copied successfully.');
              
//                   // Xóa tệp gốc
//                   fs.unlink(oldFilePath, (err) => {
//                     if (err) {
//                       console.error('Error deleting original file:', err);
//                       res.status(200).send("Khong doi duoc");
//                     } else {
//                       console.log('Original file deleted successfully.');
//                       res.status(200).send("Da doi thanh cong");
//                     }
//                   });
//                 }
//               });
//           }
//       });
//   });
// });



app.post("/ngungStream",bodyParser.json(), async function (req, res) {
  res.status(200).send("Da xong");
  const currentDir = __dirname;
  const directory = path.resolve(currentDir, '/record');
  const searchString = req.body.nameold;
  const newFileName = req.body.namenew;
  const oldFilePath = path.join(directory, searchString+".mp4");
  const newFilePath = path.join(directory, newFileName+".mp4");
  // const videoPath = oldFilePath; // Thay đổi đường dẫn tới video của bạn
  // const outputPath = path.resolve(currentDir, '/imgsvideo/'+newFileName+'.jpg');
  // captureFirstFrame(videoPath, outputPath);
  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      console.error(`Không thể đổi tên file: ${err.message}`);
    } else {
      // console.log('Đã đổi tên file thành công!');
      a.push(newFileName);
      if(kt==1){
          hamChay();
      }
    }
  });
});

function hamChay(){
  kt=0;
  if(a.length===0){
      kt=1;
      return 1;
  }
  else{
      let ok = a.shift();
      hamChuyenFile(ok).then((result) => {
          // console.log("Công việc tiếp theo sau hamChuyenFile:");
          const currentDir = __dirname;
          const directory = path.resolve(currentDir, '/record');
          const oldFilePath = path.join(directory, ok+".mp4");
          fs.unlink(oldFilePath, (err) => {
            if (err) {
              // console.error('Error deleting original file:', err);
            } else {
              console.log('Original file deleted successfully.');
              return hamChay();
            }
          });
          thayDoiTrangThai(ok);
      })
      .catch((error) => {
          console.error('Error:', error);
          return("O");
      });
  }
}

function hamChuyenFile(name){

  const currentDir = __dirname;
  const directory = path.resolve(currentDir, '/record/'+name+".mp4");
  const directorynew = path.resolve(currentDir, '/record-data/'+name);

  const inputVideoPath = directory;
  const outputFolderPath = directorynew;

  return new Promise((resolve, reject) => {
      // Tạo thư mục đầu ra nếu nó không tồn tại
      if (!fs.existsSync(outputFolderPath)) {
          fs.mkdirSync(outputFolderPath);
      }

      // Sử dụng fluent-ffmpeg để cắt video và tạo m3u8
      ffmpeg1(inputVideoPath)
          .addOption('-c:v', 'libx264')
          .addOption('-c:a', 'aac')
          .addOption('-hls_time', '10') // Độ dài mỗi đoạn
          .addOption('-hls_list_size', '0') // Kích thước danh sách phát
          .addOption('-hls_wrap', '0') // Số lượng đoạn trước khi bắt đầu ghi đè
          .output(`${outputFolderPath}/index.m3u8`)
          .on('end', () => {
              console.log('Conversion finished!');
              resolve('Conversion finished!');
          })
          .on('error', (err) => {
              console.error('Error:', err);
              reject(err);
          })
          .run();
  });
}


// app.post("/startstream",bodyParser.json(), async function (req, res) {
//   const currentDir = __dirname;
//   const directory = path.resolve(currentDir, '/record');
//   const searchString = req.body.nameold;
//   var ok =0;
//   fs.readdir(directory, (err, files) => {
//       if (err) {
//           console.error('Error reading directory:', err);
//           return;
//       }
//       files.forEach(file => {
//           if (file.startsWith(searchString)) {
//               const oldFilePath = path.join(directory, file);
//               ok=1;
//               fs.unlink(oldFilePath, (err) => {
//                 if (err) {
//                   console.error('Error deleting original file:', err);
//                   res.status(200).send("Khong doi duoc");
//                 } else {
//                   console.log('Original file deleted successfully.');
//                   res.status(200).send("Da doi thanh cong");
//                 }
//               });
//           }
//       });
//       if(ok==0){
//         res.status(200).send("Da doi thanh cong");
//       }
//   });
// });

function captureFirstFrame(videoPath, outputPath) {
  const command = `${ffmpeg} -i ${videoPath} -ss 1 -vframes 1 ${outputPath}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error capturing frame: ${stderr}`);
    } else {
      console.log('First frame captured successfully.');
    }
  });
}

function thayDoiTrangThai(namenew){
  let data = JSON.stringify({
    "name": "Cùng chơi lol",
    "views": "10",
    "url": namenew,
    "date": "2023-11-06 19:00:00",
    "username": "datbttb",
    "trangThai": 0
  });
  
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: 'http://serverapi:8081/video/updateTrangThaiVideo',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
}

app.listen(8000, function() {
    console.log("Listening on port 8000");
})
