package com.doan.WebLiveStreamGame.controlller;


import com.doan.WebLiveStreamGame.model.TuongTac;
import com.doan.WebLiveStreamGame.model.TuongTacRequest;
import com.doan.WebLiveStreamGame.model.User;
import com.doan.WebLiveStreamGame.model.Video;
import com.doan.WebLiveStreamGame.service.impl.TuongTacServiceImpl;
import com.doan.WebLiveStreamGame.service.impl.UserServiceImpl;
import com.doan.WebLiveStreamGame.service.impl.VideoServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tuong-tac")
@RequiredArgsConstructor
@CrossOrigin
public class TuongTacController {

    private final TuongTacServiceImpl tuongTacService;
    private final UserServiceImpl userService;
    private final VideoServiceImpl videoService;

    @PostMapping("add-tuong-tac")
    public ResponseEntity<?> addTuongTac(@RequestBody TuongTacRequest tuongTacRequest){
        if(tuongTacService.getTuongTacByUsernameAndUrl(tuongTacRequest.getUsername(),tuongTacRequest.getUrl())!=null){
            tuongTacService.updateTuongTac(tuongTacRequest.getUsername(),tuongTacRequest.getUrl(), tuongTacRequest.getTrangThai());
            return ResponseEntity.ok().body("Da luu thanh cong");
        }
        Video video = videoService.getVideoByUrl(tuongTacRequest.getUrl());
        User user = userService.findByUsername(tuongTacRequest.getUsername()).stream().toList().get(0);
        TuongTac tuongTac= new TuongTac();
        tuongTac.setUser_id(user);
        tuongTac.setVideo_id(video);
        tuongTac.setTrangThai(tuongTacRequest.getTrangThai());
        tuongTacService.addTuongTac(tuongTac);
        return ResponseEntity.ok().body("Da luu thanh cong");
    }

    @DeleteMapping("delete-tuong-tac")
    public ResponseEntity<?> deleteTuongTac(@RequestBody TuongTacRequest tuongTacRequest){
        tuongTacService.deleteTuongTac(tuongTacRequest.getUsername(),tuongTacRequest.getUrl());
        return ResponseEntity.ok().body("Da xoa thanh cong");
    }

    @GetMapping("get-video-thich/{username}")
    public ResponseEntity<?> getVideoThich(@PathVariable(name = "username") String username){
        List<Video> videoList = tuongTacService.getVideoByUsernameAndTrangThai(username,1);
        return new ResponseEntity<>(videoList, HttpStatus.OK);
    }

    @GetMapping("get-video-khong-thich/{username}")
    public ResponseEntity<?> getVideoKhongThich(@PathVariable(name = "username") String username){
        List<Video> videoList = tuongTacService.getVideoByUsernameAndTrangThai(username,0);
        return new ResponseEntity<>(videoList, HttpStatus.OK);
    }

    @PostMapping("get-video-url-username")
    public ResponseEntity<?> getTuongTacByUsernameAndUrl(@RequestBody TuongTacRequest tuongTacRequest){
        TuongTac tuongTac = tuongTacService.getTuongTacByUsernameAndUrl(tuongTacRequest.getUsername(),tuongTacRequest.getUrl());
        return new ResponseEntity<>(tuongTac,HttpStatus.OK);
    }

    @PutMapping("update-tuong-tac")
    public ResponseEntity<?> updateTuongTac(@RequestBody TuongTacRequest tuongTacRequest){
        tuongTacService.updateTuongTac(tuongTacRequest.getUsername(),tuongTacRequest.getUrl(), tuongTacRequest.getTrangThai());
        return ResponseEntity.ok().body("Update thanh cong");
    }

    @GetMapping("so-luot-tuong-tac/{urlvideo}")
    public ResponseEntity<?> soLuotTuongTac(@PathVariable(name = "urlvideo") String urlvideo){
        return new ResponseEntity<>(tuongTacService.soLuotTuongTac(urlvideo), HttpStatus.OK);
    }
}
