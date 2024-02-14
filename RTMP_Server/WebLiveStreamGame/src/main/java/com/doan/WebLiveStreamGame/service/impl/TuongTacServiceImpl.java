package com.doan.WebLiveStreamGame.service.impl;

import com.doan.WebLiveStreamGame.model.TuongTac;
import com.doan.WebLiveStreamGame.model.Video;
import com.doan.WebLiveStreamGame.repository.TuongTacRepository;
import com.doan.WebLiveStreamGame.service.TuongTacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TuongTacServiceImpl implements TuongTacService {

    @Autowired
    private TuongTacRepository tuongTacRepository;

    @Override
    public void addTuongTac(TuongTac tuongTac) {
        tuongTacRepository.save(tuongTac);
    }

    @Override
    public TuongTac getTuongTacByUsernameAndUrl(String username, String url) {
        Optional<TuongTac> tuongTac=tuongTacRepository.findByUserNameAndUrl(username,url);
        if(tuongTac.isEmpty()){
            return null;
        }
        return tuongTac.stream().toList().get(0);
    }

    @Override
    public void deleteTuongTac(String username, String url) {
        TuongTac tuongTac=tuongTacRepository.findByUserNameAndUrl(username,url).stream().toList().get(0);
        tuongTacRepository.delete(tuongTac);
    }

    @Override
    public void updateTuongTac(String username, String url, int trangThai) {
        TuongTac tuongTac=tuongTacRepository.findByUserNameAndUrl(username,url).stream().toList().get(0);
        tuongTac.setTrangThai(trangThai);
        tuongTacRepository.save(tuongTac);
    }

    @Override
    public List<Video> getVideoByUsernameAndTrangThai(String username, int trangThai) {
        List<Video> videoList = tuongTacRepository.getVideoTheoTrangThai(username,trangThai);
        return videoList;
    }

    @Override
    public List<Long> soLuotTuongTac(String urlVideo) {
        List<Long> longs = new ArrayList<>();
        Long luotThich = tuongTacRepository.soLuotTuongTac(urlVideo,1);
        Long luotKhongThich = tuongTacRepository.soLuotTuongTac(urlVideo,0);
        longs.add(luotThich);
        longs.add(luotKhongThich);
        return longs;
    }
}
