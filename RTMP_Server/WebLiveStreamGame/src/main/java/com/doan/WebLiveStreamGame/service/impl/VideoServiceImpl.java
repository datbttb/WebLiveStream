package com.doan.WebLiveStreamGame.service.impl;

import com.doan.WebLiveStreamGame.model.Video;
import com.doan.WebLiveStreamGame.repository.VideoRepository;
import com.doan.WebLiveStreamGame.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VideoServiceImpl implements VideoService {

    @Autowired
    private VideoRepository videoRepository;

    @Override
    public void saveVideo(Video video) {
        videoRepository.save(video);
    }

    @Override
    public void updateVideo(Video video) {
        Video video1 = videoRepository.getReferenceById(video.getId());
        System.out.println(video1.getId());
        videoRepository.save(video1);
    }

    @Override
    public void deleteVideoById(Long id) {
        videoRepository.deleteById(id);
    }

    @Override
    public List<Video> getVideoAll() {
        return videoRepository.findAll();
    }

    @Override
    public List<Video> getVideoById(Long videoId) {
        return videoRepository.findById(videoId).stream().toList();
    }

    @Override
    public List<Video> getVideoByUser(String username) {
        return videoRepository.findVideoByUsername(username);
    }

    @Override
    public List<Video> getVideoByName(String nameVideo) {
        return videoRepository.findVideoByName(nameVideo).stream().toList();
    }

    @Override
    public Video getVideoByUsernameAndTrangThai(String username, int trangThai) {
        if(videoRepository.findVideoByNameAndTrangThai(username,trangThai).isEmpty()){
            return null;
        }
        else {
            Video video = videoRepository.findVideoByNameAndTrangThai(username, trangThai).stream().toList().get(0);
            return video;
        }

    }

    @Override
    public Video getVideoByUrl(String url) {
        if(!videoRepository.findVideoByUrl(url).isPresent()){
            return null;
        }
        Video video = videoRepository.findVideoByUrl(url).stream().toList().get(0);
        return video;
    }

    @Override
    public List<Video> getVideosByTrangThai(int trangThai) {
        return videoRepository.findVideosByTrangThai(trangThai);
    }

    @Override
    public List<Video> getVideoByVideoNameAndTrangThai(String videoName, int trangThai) {
        return videoRepository.findVideoByVideoNameAndTrangThai(videoName,trangThai);
    }

    @Override
    public List<Video> getAllVideo() {
        return videoRepository.findAll();
    }


}
