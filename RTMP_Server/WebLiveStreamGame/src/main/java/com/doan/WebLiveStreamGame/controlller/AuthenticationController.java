package com.doan.WebLiveStreamGame.controlller;

import com.doan.WebLiveStreamGame.authentication.AuthenticationRequest;
import com.doan.WebLiveStreamGame.authentication.AuthenticationResponse;
import com.doan.WebLiveStreamGame.model.RegisterRequest;
import com.doan.WebLiveStreamGame.model.User;
import com.doan.WebLiveStreamGame.repository.UserRepository;
import com.doan.WebLiveStreamGame.service.UserService;
import com.doan.WebLiveStreamGame.service.impl.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    private final UserService userService;

    private final UserRepository userRepository;

    @PostMapping("login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest){
        return ResponseEntity.ok(authenticationService.authenticationResponse(authenticationRequest));
    }

    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest){
        if(userRepository.findByUsername(registerRequest.getUsername()).isPresent()){
            System.out.println("OK");
            return ResponseEntity.badRequest().body("Username address already in use.");
        }
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()){
            return ResponseEntity.badRequest().body("Username email already in use.");
        }
        User user=new User();
        user.setEmail(registerRequest.getEmail());
        user.setName(registerRequest.getName());
        user.setPassword(registerRequest.getPassword());
        user.setAvatar(registerRequest.getAvatar());
        user.setUsername(registerRequest.getUsername());
        userService.saveUser(user);
        userService.addRoleToUser(user.getEmail(),"ROLE_USER");
        return ResponseEntity.ok().body("User registered successfully");
    }

    @GetMapping("test")
    public ResponseEntity<?> getUserByUserName(){
        return ResponseEntity.badRequest().body("User name is not found");
    }

}
