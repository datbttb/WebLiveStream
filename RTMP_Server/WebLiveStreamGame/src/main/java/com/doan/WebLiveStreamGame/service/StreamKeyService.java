package com.doan.WebLiveStreamGame.service;

import com.doan.WebLiveStreamGame.model.StreamKey;
import com.doan.WebLiveStreamGame.model.User;

import java.util.List;

public interface StreamKeyService {
    void saveStreamKey(StreamKey streamKey);

    void updateStreamKey(StreamKey streamKey);

    void deleteStreamKey(StreamKey streamKey);

    List<StreamKey> getStreamKeyAll();

    StreamKey getStreamKeyByUsername(String Username);

    Long getCountRecord();

    String renderStreamKey(String a, Long number);

}
