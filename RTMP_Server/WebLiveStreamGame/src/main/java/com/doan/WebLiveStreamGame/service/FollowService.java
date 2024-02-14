package com.doan.WebLiveStreamGame.service;

import com.doan.WebLiveStreamGame.model.Follow;
import com.doan.WebLiveStreamGame.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FollowService {
    List<User> dsNguoiDangFollow(String username);

    List<User> dsNguoiFollow(String username);

    int soNguoiDangFollow(String username);

    int soNguoiFollow(String username);

    void add(Follow follow);

    void delete(Follow follow);

    boolean checkFollowUserUser(String usfollow, String usfollowing);
}
