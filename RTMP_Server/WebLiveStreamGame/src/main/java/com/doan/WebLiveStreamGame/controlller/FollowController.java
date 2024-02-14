package com.doan.WebLiveStreamGame.controlller;

import com.doan.WebLiveStreamGame.model.Follow;
import com.doan.WebLiveStreamGame.model.FollowRequest;
import com.doan.WebLiveStreamGame.model.User;
import com.doan.WebLiveStreamGame.service.impl.FollowServiceImpl;
import com.doan.WebLiveStreamGame.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("follow")
@RequiredArgsConstructor
@CrossOrigin
public class FollowController {

    private final FollowServiceImpl followService;
    private final UserServiceImpl userService;

    @GetMapping("get-ds-nguoi-follow/{username}")
    public ResponseEntity<?> getDsNguoiFollow(@PathVariable(name = "username") String username){
        List<User> userList = followService.dsNguoiFollow(username);
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @GetMapping("get-ds-nguoi-dang-follow/{username}")
    public ResponseEntity<?> getDsNguoiDangFollow(@PathVariable(name = "username") String username){
        List<User> userList = followService.dsNguoiDangFollow(username);
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @GetMapping("so-nguoi-follow/{username}")
    public ResponseEntity<?> getSoNguoiFollow(@PathVariable(name = "username") String username){
        return new ResponseEntity<>(followService.soNguoiFollow(username), HttpStatus.OK);
    }

    @GetMapping("so-nguoi-dang-follow/{username}")
    public ResponseEntity<?> getSoNguoiDangFollow(@PathVariable(name = "username") String username){
        return new ResponseEntity<>(followService.soNguoiDangFollow(username), HttpStatus.OK);
    }

    @PostMapping("add-follow")
    private ResponseEntity<?> addFollow(@RequestBody FollowRequest followRequest){
        User userFollow = userService.findByUsername(followRequest.getUserFollow()).stream().toList().get(0);
        User userFollowing = userService.findByUsername(followRequest.getUserFollowing()).stream().toList().get(0);
        Follow follow = new Follow();
        follow.setFollow_id(userFollow);
        follow.setFollowing_id(userFollowing);
        followService.add(follow);
        return ResponseEntity.ok().body("Da luu thanh cong");
    }

    @DeleteMapping("delete-follow")
    private ResponseEntity<?> deleteFollow(@RequestBody FollowRequest followRequest){
        User userFollow = userService.findByUsername(followRequest.getUserFollow()).stream().toList().get(0);
        User userFollowing = userService.findByUsername(followRequest.getUserFollowing()).stream().toList().get(0);
        Follow follow = new Follow();
        follow.setFollow_id(userFollow);
        follow.setFollowing_id(userFollowing);
        followService.delete(follow);
        return ResponseEntity.ok().body("Da xoa thanh cong");
    }

    @PostMapping("check-follow-user-user")
    private ResponseEntity<?> checkFollow(@RequestBody FollowRequest followRequest){
        boolean check = followService.checkFollowUserUser(followRequest.getUserFollow(),followRequest.getUserFollowing());
        if(check == true){
            return ResponseEntity.ok().body("true");
        }
        else {
            return ResponseEntity.ok().body("flase");
        }
    }

}
