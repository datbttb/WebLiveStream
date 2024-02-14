package com.doan.WebLiveStreamGame.service.impl;

import com.doan.WebLiveStreamGame.model.PhanHoi;
import com.doan.WebLiveStreamGame.repository.PhanHoiRepository;
import com.doan.WebLiveStreamGame.service.PhanHoiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhanHoiServiceImpl implements PhanHoiService {

    @Autowired
    private PhanHoiRepository phanHoiRepository;


    @Override
    public void savePhanHoi(PhanHoi phanHoi) {
        phanHoiRepository.save(phanHoi);
    }

    @Override
    public void deletePhanHoi(Long idph) {
        phanHoiRepository.deleteById(idph);
    }

    @Override
    public List<PhanHoi> getPhanHoiAll() {
        return phanHoiRepository.findAll();
    }

    @Override
    public List<PhanHoi> getPhanHoiByVideoName(String name) {
        return phanHoiRepository.findPhanHoiByVideoName(name);
    }

    @Override
    public List<PhanHoi> getPhanHoiByUser(String username) {
        return phanHoiRepository.findPhanHoiByUserName(username);
    }

    @Override
    public List<PhanHoi> getPhanHoiByTrangThaiPH(int trangThaiPH) {
        return phanHoiRepository.findPhanHoisByTrangThaiPH(trangThaiPH);
    }

    @Override
    public void updateTrangThaiPhanHoi(Long id, int trangThai) {
        PhanHoi phanHoi=phanHoiRepository.findById(id).stream().toList().get(0);
        phanHoi.setTrangThaiPH(trangThai);
        phanHoiRepository.save(phanHoi);
    }


}
