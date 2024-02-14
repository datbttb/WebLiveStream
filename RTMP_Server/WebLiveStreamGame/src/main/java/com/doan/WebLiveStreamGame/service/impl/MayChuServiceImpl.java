package com.doan.WebLiveStreamGame.service.impl;

import com.doan.WebLiveStreamGame.model.MayChu;
import com.doan.WebLiveStreamGame.repository.MayChuRepository;
import com.doan.WebLiveStreamGame.service.MayChuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MayChuServiceImpl implements MayChuService {

    @Autowired
    private MayChuRepository mayChuRepository;


    @Override
    public void save(MayChu mayChu) {
        mayChuRepository.save(mayChu);
    }

    @Override
    public List<MayChu> getAll() {
        return mayChuRepository.findAll();
    }

    @Override
    public MayChu getMayChu(Long id) {
        Optional<MayChu> dsmaychu = mayChuRepository.findById(id);
        return dsmaychu.stream().toList().get(0);
    }

    @Override
    public void update(MayChu mayChu) {
        MayChu mayChu1 = mayChuRepository.findById(mayChu.getId()).stream().toList().get(0);
        mayChu1.setLinkServer(mayChu.getLinkServer());
        mayChuRepository.save(mayChu1);
    }
}
