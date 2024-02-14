package com.doan.WebLiveStreamGame.service.impl;

import com.doan.WebLiveStreamGame.authentication.AuthenticationRequest;
import com.doan.WebLiveStreamGame.authentication.AuthenticationResponse;
import com.doan.WebLiveStreamGame.model.Role;
import com.doan.WebLiveStreamGame.model.User;
import com.doan.WebLiveStreamGame.repository.RoleCustomRepository;
import com.doan.WebLiveStreamGame.repository.UserRepository;
import com.doan.WebLiveStreamGame.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final RoleCustomRepository roleCustomRepository;
    private final JwtService jwtService;
    private final UserServiceImpl userServiceImpl;

    public AuthenticationResponse authenticationResponse(AuthenticationRequest authenticationRequest){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
//        User user = userRepository.findByEmail(authenticationRequest.getEmail()).orElseThrow();
        User user = userRepository.findByUsername(authenticationRequest.getUsername()).orElseThrow();
        Role role=null;
        if(user!=null){
//            role=userServiceImpl.findRoleById(Long.parseLong("1")).stream().collect(Collectors.toList()).get(0);
            role = user.getRole_id();
        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.setRole_id(role);
        authorities.add(new SimpleGrantedAuthority(role.getName()));
        String jwtToken = jwtService.generateToken(user,authorities);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}
