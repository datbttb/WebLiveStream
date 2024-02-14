package com.doan.WebLiveStreamGame.service.impl;

import com.doan.WebLiveStreamGame.model.BaoCao;
import com.doan.WebLiveStreamGame.repository.BaoCaoRepository;
import com.doan.WebLiveStreamGame.service.BaoCaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BaoCaoServiceImpl implements BaoCaoService {

    @Autowired
    private BaoCaoRepository baoCaoRepository;

    @Override
    public void saveBaoCao(BaoCao baoCao) {
        baoCaoRepository.save(baoCao);
    }

    @Override
    public void deleteBaoCao(Long idbc) {
        baoCaoRepository.deleteById(idbc);
    }

    @Override
    public List<BaoCao> getBaoCaoAll() {
        return baoCaoRepository.findAll();
    }

    @Override
    public List<BaoCao> getBaoCaoByVideoName(String name) {
        return baoCaoRepository.findBaoCaoByVideoName(name);
    }

    @Override
    public List<BaoCao> getBaoCaoByUser(String username) {
        return baoCaoRepository.findBaoCaoByUserName(username);
    }

    @Override
    public List<BaoCao> getBaoCaoByTrangThaiBC(int trangThaiBC) {
        return baoCaoRepository.findBaoCaoByTrangThaiBC(trangThaiBC);
    }

    @Override
    public void updateTrangThaiBaoCao(Long id, int trangThai) {
        BaoCao baoCao = baoCaoRepository.findById(id).stream().toList().get(0);
        baoCao.setTrangThaiBC(trangThai);
        baoCaoRepository.save(baoCao);
    }

    @Override
    public List<BaoCao> searchBaoCaoByTrangThai(String name, int trangThai) {
        return baoCaoRepository.findBaoCaoByVideoNameAndTrangThaiBC(name, trangThai);
    }
}
