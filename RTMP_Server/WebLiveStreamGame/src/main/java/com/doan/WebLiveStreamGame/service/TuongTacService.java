package com.doan.WebLiveStreamGame.service;

import com.doan.WebLiveStreamGame.model.TuongTac;
import com.doan.WebLiveStreamGame.model.Video;

import java.util.ArrayList;
import java.util.List;

public interface TuongTacService {

    void addTuongTac(TuongTac tuongTac);

    TuongTac getTuongTacByUsernameAndUrl(String username, String url);

    void deleteTuongTac(String username, String url);

    void updateTuongTac(String username, String url, int trangThai);

    List<Video> getVideoByUsernameAndTrangThai(String username, int trangThai);

    List<Long> soLuotTuongTac(String urlVideo);

}
