package com.doan.WebLiveStreamGame.service.impl;

import com.doan.WebLiveStreamGame.model.Follow;
import com.doan.WebLiveStreamGame.model.User;
import com.doan.WebLiveStreamGame.repository.FollowRepository;
import com.doan.WebLiveStreamGame.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FollowServiceImpl implements FollowService {

    @Autowired
    private FollowRepository followRepository;
    @Override
    public List<User> dsNguoiDangFollow(String username) {
        return followRepository.dangSachDangFollow(username);
    }

    @Override
    public List<User> dsNguoiFollow(String username) {
        return followRepository.dangSachFollow(username);
    }

    @Override
    public int soNguoiDangFollow(String username) {
        return followRepository.dangSachDangFollow(username).size();
    }

    @Override
    public int soNguoiFollow(String username) {
        return followRepository.dangSachFollow(username).size();
    }

    @Override
    public void add(Follow follow) {
        followRepository.save(follow);
    }

    @Override
    public void delete(Follow follow) {
        Follow follow1=followRepository.getFollowByFollowidAndFollowingid(follow.getFollowing_id().getUsername(), follow.getFollow_id().getUsername()).stream().toList().get(0);
        followRepository.delete(follow1);
    }

    @Override
    public boolean checkFollowUserUser(String usfollow, String usfollowing) {
        Optional<Follow> follow = followRepository.getFollowByFollowidAndFollowingid(usfollowing,usfollow);
        if(follow.isEmpty()){
            return false;
        }
        else {
            return true;
        }
    }


}
