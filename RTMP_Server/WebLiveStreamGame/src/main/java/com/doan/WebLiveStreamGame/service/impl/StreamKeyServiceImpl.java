package com.doan.WebLiveStreamGame.service.impl;

import com.doan.WebLiveStreamGame.model.StreamKey;
import com.doan.WebLiveStreamGame.repository.StreamKeyRepository;
import com.doan.WebLiveStreamGame.repository.UserRepository;
import com.doan.WebLiveStreamGame.service.StreamKeyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StreamKeyServiceImpl implements StreamKeyService {

    @Autowired
    private StreamKeyRepository streamKeyRepository;


    @Override
    public void saveStreamKey(StreamKey streamKey) {
        streamKeyRepository.save(streamKey);
    }

    @Override
    public void updateStreamKey(StreamKey streamKey) {
    }

    @Override
    public void deleteStreamKey(StreamKey streamKey) {
        streamKeyRepository.delete(streamKey);
    }

    @Override
    public List<StreamKey> getStreamKeyAll() {
        return streamKeyRepository.findAll();
    }

    @Override
    public StreamKey getStreamKeyByUsername(String username) {
        return streamKeyRepository.findStreamKeyByUserName(username).stream().toList().get(0);
    }

    @Override
    public Long getCountRecord() {
        return streamKeyRepository.countRecord();
    }

    @Override
    public String renderStreamKey(String a, Long number) {
        String ketqua = "";
        for (int i=0; i<6; i++){
            long sodulong = number%26;
            int soduint = (int) sodulong;
            int sodich = 'a' + (a.charAt(i)-'a'+soduint%26)%26;
            char kytu = (char) sodich;
            ketqua = ketqua +kytu;
            number=number/26;
        }
        return ketqua;
    }


}
