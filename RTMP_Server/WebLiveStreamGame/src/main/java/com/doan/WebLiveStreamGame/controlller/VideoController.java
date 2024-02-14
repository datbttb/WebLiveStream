package com.doan.WebLiveStreamGame.controlller;


import com.doan.WebLiveStreamGame.model.StreamKey;
import com.doan.WebLiveStreamGame.model.Video;
import com.doan.WebLiveStreamGame.model.VideoRequest;
import com.doan.WebLiveStreamGame.service.impl.StreamKeyServiceImpl;
import com.doan.WebLiveStreamGame.service.impl.VideoServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("video")
@RequiredArgsConstructor
@CrossOrigin
public class VideoController {

    @Autowired
    private VideoServiceImpl videoService;

    @Autowired
    private StreamKeyServiceImpl streamKeyService;

    @PostMapping("addVideo")
    public ResponseEntity<?> addVideo(@RequestBody VideoRequest videoRequest){
        if(videoService.getVideoByUsernameAndTrangThai(videoRequest.getUsername(), 1)!=null){
            return ResponseEntity.badRequest().body("Dang live");
        }
        String dateString = videoRequest.getDate();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        try {
            date = dateFormat.parse(dateString);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Video video = new Video();
        StreamKey streamKey = streamKeyService.getStreamKeyByUsername(videoRequest.getUsername());
        video.setUrl(videoRequest.getUrl());
        video.setDate(date);
        video.setName(videoRequest.getName());
        video.setViews(videoRequest.getViews());
        video.setKey_id(streamKey);
        video.setTrangThai(videoRequest.getTrangThai());
        videoService.saveVideo(video);
        return ResponseEntity.ok().body("Da luu video");
    }

    @GetMapping("videos-user/{username}")
    public ResponseEntity<?> getVideoByUserName(@PathVariable(name = "username") String username){
        List<Video> videoList = videoService.getVideoByUser(username);
        if(videoList.isEmpty()){
            return ResponseEntity.ok().body("Khong co video");
        }
        else {
            return new ResponseEntity<>(videoList, HttpStatus.OK);
        }
    }

    @GetMapping("videos-name/{videoname}")
    public ResponseEntity<?> getVideoByName(@PathVariable(name = "videoname") String videoname){
        return new ResponseEntity<>(videoService.getVideoByName(videoname), HttpStatus.OK);
    }

    @PutMapping("updateVideo")
    public ResponseEntity<?> updateVideo(@RequestBody VideoRequest videoRequest){
        if(videoService.getVideoByUsernameAndTrangThai(videoRequest.getUsername(), 1)==null){
            return ResponseEntity.badRequest().body("No Live");
        }
        String dateString = videoRequest.getDate();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        try {
            date = dateFormat.parse(dateString);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Video video = videoService.getVideoByUrl(videoRequest.getUrl());
        StreamKey streamKey = streamKeyService.getStreamKeyByUsername(videoRequest.getUsername());
        video.setUrl(videoRequest.getUrl());
        video.setDate(date);
        video.setName(videoRequest.getName());
        video.setViews(videoRequest.getViews());
        video.setKey_id(streamKey);
        video.setTrangThai(videoRequest.getTrangThai());
        videoService.updateVideo(video);
        return ResponseEntity.ok().body("Da update video");
    }

    @DeleteMapping("deleVideo/{videoid}")
    public ResponseEntity<?> deleteVideo(@PathVariable(name = "videoid") String videoid){
        videoService.deleteVideoById(Long.parseLong(videoid));
        return ResponseEntity.ok().body("Video da duoc xoa");
    }

    @GetMapping("getVideoStream/{username}")
    public ResponseEntity<?> getVideoStream(@PathVariable(name = "username") String username){
        if(videoService.getVideoByUsernameAndTrangThai(username, 1) == null){
            return ResponseEntity.badRequest().body("Khong co video dang stream");
        }
        Video video = videoService.getVideoByUsernameAndTrangThai(username, 1);
        return new ResponseEntity<>(video, HttpStatus.OK);
    }

    @GetMapping("getvideobyUrl/{url}")
    public ResponseEntity<?> getVideoByUrl(@PathVariable(name = "url") String url){
        Video video = videoService.getVideoByUrl(url);
        if(video == null){
            return ResponseEntity.badRequest().body("Khong tim thay video");
        }
        else {
            return new ResponseEntity<>(video,HttpStatus.OK);
        }
    }

    @GetMapping("getvideobyTrangThai/{trangThai}")
    public ResponseEntity<?> getVideoByTrangThai(@PathVariable(name = "trangThai") String trangThai){
        int trangThai1 = Integer.parseInt(trangThai);
        List<Video> videoList = videoService.getVideosByTrangThai(trangThai1);
        return new ResponseEntity<>(videoList, HttpStatus.OK);
    }

    @PutMapping("updateTrangThaiVideo")
    public ResponseEntity<?> updateTrangThaiVideo(@RequestBody VideoRequest videoRequest){
        Video video = videoService.getVideoByUrl(videoRequest.getUrl());
        video.setTrangThai(videoRequest.getTrangThai());
        videoService.updateVideo(video);
        return ResponseEntity.ok().body("Da update video");
    }

    @GetMapping("getnameandtrangthai")
    public ResponseEntity<?> getVideoByVideoNameAndTrangThai(@RequestParam(name = "kw") String videoName, @RequestParam(name = "trangthai") int trangThai){
        return new ResponseEntity<>(videoService.getVideoByVideoNameAndTrangThai(videoName, trangThai), HttpStatus.OK);
    }

    @GetMapping("getall")
    public ResponseEntity<?> getAllVideo(){
        return new ResponseEntity<>(videoService.getAllVideo(), HttpStatus.OK);
    }
}
