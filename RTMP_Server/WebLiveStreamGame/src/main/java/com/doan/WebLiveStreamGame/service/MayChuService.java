package com.doan.WebLiveStreamGame.service;

import com.doan.WebLiveStreamGame.model.MayChu;

import java.util.List;

public interface MayChuService {
    void save(MayChu mayChu);

    List<MayChu> getAll();

    MayChu getMayChu(Long id);

    void update(MayChu mayChu);

}
