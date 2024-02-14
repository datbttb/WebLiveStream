package com.doan.WebLiveStreamGame.service;

import com.doan.WebLiveStreamGame.model.Video;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public interface VideoService {
    void saveVideo(Video video);

    void updateVideo(Video video);

    void deleteVideoById(Long id);

    List<Video> getVideoAll();

    List<Video> getVideoById(@NotNull Long videoId);

    List<Video> getVideoByUser(String username);

    List<Video> getVideoByName(String nameVideo);

    Video getVideoByUsernameAndTrangThai(String username, int trangThai);

    Video getVideoByUrl(String url);

    List<Video> getVideosByTrangThai(int trangThai);

    List<Video> getVideoByVideoNameAndTrangThai(String videoName, int trangThai);

    List<Video> getAllVideo();
}
