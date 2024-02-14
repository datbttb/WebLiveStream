package com.doan.WebLiveStreamGame.controlller;


import com.doan.WebLiveStreamGame.model.User;
import com.doan.WebLiveStreamGame.repository.UserRepository;
import com.doan.WebLiveStreamGame.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final UserServiceImpl userService;

    @GetMapping("/get-by-username/{username}")
    public ResponseEntity<?> getUserByUserName(@PathVariable(name = "username") String username){
        if(userService.findByUsername(username)==null){
            return ResponseEntity.badRequest().body("User name is not found");
        }

        Optional<User> userOptional = userService.findByUsername(username);
        List<User> userArrayList = userOptional.stream().toList();

        return new ResponseEntity<>(userArrayList.get(0), HttpStatus.OK);

    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
    }

    @DeleteMapping("delete-user/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable(name = "username") String username){
        if(userService.findByUsername(username) == null){
            return ResponseEntity.badRequest().body("Tai khoan khong ton tai");
        }

        userService.deleteUserByUserName(username);
        return  ResponseEntity.ok().body("Da xoa tai khoan" + username);
    }

    @PutMapping("update-user")
    public ResponseEntity<?> updateUser(@RequestBody User user){
        userService.updateUser(user);
        return ResponseEntity.ok().body("Cap nhat thanh cong");
    }

    @GetMapping("search-by-username")
    public ResponseEntity<?> searchUserByUsername(@RequestParam(name = "kw") String username){
        return new ResponseEntity<>(userService.searchUserByUserName(username), HttpStatus.OK);
    }

    @PutMapping("update-quyen")
    public ResponseEntity<?> updateQuyen(@RequestParam(name = "username") String username, @RequestParam(name = "rolename") String rolename){
        userService.updateQuyen(username,rolename);
        return ResponseEntity.ok().body("Update quyen thanh cong");
    }

    @GetMapping("find-by-username-role")
    public ResponseEntity<?> findByRoleIDAndUsername(@RequestParam(name = "kw") String username, @RequestParam(name = "idRole") Long idRole){
        return new ResponseEntity<>(userService.findUserByRoleIDAndUsername(username,idRole), HttpStatus.OK);
    }

}
