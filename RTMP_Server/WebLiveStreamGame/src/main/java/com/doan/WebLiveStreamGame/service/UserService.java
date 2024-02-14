package com.doan.WebLiveStreamGame.service;

import com.doan.WebLiveStreamGame.model.Role;
import com.doan.WebLiveStreamGame.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Role saveRole(Role role);
    void addRoleToUser(String email, String rolename);
    Optional<Role> findRoleById(Long i);
    Optional<User> findByUsername(String username);

    void deleteUserByUserName(String username);

    void updateUser(User user);

    List<User> getAll();

    List<User> searchUserByUserName(String username);

    void updateQuyen(String username, String role);

    List<User> findUserByRoleIDAndUsername(String username, Long idRole);

}
