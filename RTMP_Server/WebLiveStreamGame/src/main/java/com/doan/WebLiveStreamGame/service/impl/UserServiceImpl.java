package com.doan.WebLiveStreamGame.service.impl;

import com.doan.WebLiveStreamGame.model.Role;
import com.doan.WebLiveStreamGame.model.User;
import com.doan.WebLiveStreamGame.repository.RoleRepository;
import com.doan.WebLiveStreamGame.repository.UserRepository;
import com.doan.WebLiveStreamGame.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public void addRoleToUser(String email, String rolename) {
        User user=userRepository.findByEmail(email).get();
        Role role = roleRepository.findByName(rolename);
        user.setRole_id(role);
    }

    @Override
    public Optional<Role> findRoleById(Long i) {
        return roleRepository.findById(i);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public void deleteUserByUserName(String username) {
        User user1 = userRepository.findByUsername(username).stream().toList().get(0);
        userRepository.delete(user1);
    }

    @Override
    public void updateUser(User user) {
        User user1 = userRepository.findByUsername(user.getUsername()).stream().toList().get(0);
        user1.setName(user.getName());
        user1.setAvatar(user.getAvatar());
        user1.setEmail(user.getEmail());
        user1.setBirthday(user.getBirthday());
        user1.setGender(user.getGender());
        user1.setPhone(user.getPhone());
        userRepository.save(user1);
    }

    @Override
    public List<User> getAll() {
        List<User> userList = userRepository.findAll();
        return userList;
    }

    @Override
    public List<User> searchUserByUserName(String username) {
        return userRepository.searchUserByUsername(username);
    }

    @Override
    public void updateQuyen(String username, String role) {
        User user = userRepository.findByUsername(username).stream().toList().get(0);
        Role role1 = roleRepository.findByName(role);
        user.setRole_id(role1);
        userRepository.save(user);
    }

    @Override
    public List<User> findUserByRoleIDAndUsername(String username, Long idRole) {
        return userRepository.findUserByRoleIDAndUsername(idRole,username);
    }

    public String saveImage(MultipartFile file, String imageName) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        String imagePath = "uploads/" + fileName;
        file.transferTo(new File(imagePath));
        return fileName;
    }

    public File getImage(String fileName) {
        // Trả về File của ảnh dựa trên tên file
        String imagePath = "uploads/" + fileName;
        return new File(imagePath);
    }

}
