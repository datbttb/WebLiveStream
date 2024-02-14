package com.doan.WebLiveStreamGame.controlller;

import com.doan.WebLiveStreamGame.model.MayChu;
import com.doan.WebLiveStreamGame.model.StreamKey;
import com.doan.WebLiveStreamGame.model.StreamKeyRequest;
import com.doan.WebLiveStreamGame.model.User;
import com.doan.WebLiveStreamGame.service.StreamKeyService;
import com.doan.WebLiveStreamGame.service.impl.MayChuServiceImpl;
import com.doan.WebLiveStreamGame.service.impl.StreamKeyServiceImpl;
import com.doan.WebLiveStreamGame.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("stream-key")
@RequiredArgsConstructor
@CrossOrigin
public class StreamKeyController {

    @Autowired
    private StreamKeyServiceImpl streamKeyService;
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private MayChuServiceImpl mayChuService;

    @PostMapping("add-key")
    public ResponseEntity<?> addStreamKey(@RequestBody StreamKeyRequest streamKey){
        User user = userService.findByUsername(streamKey.getUsername()).stream().toList().get(0);
        MayChu mayChu = mayChuService.getMayChu(streamKey.getMayChu());
        long sokey = mayChu.getSokey()+1;
        StreamKey streamKey1 = new StreamKey();
        streamKey1.setStrkey(streamKeyService.renderStreamKey(mayChu.getKeymc(),sokey));
        streamKey1.setMaychu_id(mayChu);
        streamKey1.setUser_id(user);
        streamKeyService.saveStreamKey(streamKey1);
        mayChu.setSokey(sokey);
        mayChuService.update(mayChu);
        return ResponseEntity.ok().body("Da luu du lieu");
    }

    @GetMapping("find-by-username/{username}")
    public ResponseEntity<?> getStreamKeyByUsername(@PathVariable(name = "username") String username){
        StreamKey streamKey = streamKeyService.getStreamKeyByUsername(username);
        return new ResponseEntity<>(streamKey, HttpStatus.OK);
    }

    @PutMapping("update-key")
    public ResponseEntity<?> updateStreamKey(@RequestBody StreamKeyRequest streamKey){
        User user = userService.findByUsername(streamKey.getUsername()).stream().toList().get(0);
        MayChu mayChu = mayChuService.getMayChu(streamKey.getMayChu());
        long sokey = mayChu.getSokey()+1;
        StreamKey streamKey1 = streamKeyService.getStreamKeyByUsername(streamKey.getUsername());
        streamKey1.setStrkey(streamKeyService.renderStreamKey(mayChu.getKeymc(),sokey));
        streamKey1.setMaychu_id(mayChu);
        streamKey1.setUser_id(user);
        streamKeyService.saveStreamKey(streamKey1);
        mayChu.setSokey(sokey);
        mayChuService.update(mayChu);
        return ResponseEntity.ok().body("Key da duoc update");
    }
}
