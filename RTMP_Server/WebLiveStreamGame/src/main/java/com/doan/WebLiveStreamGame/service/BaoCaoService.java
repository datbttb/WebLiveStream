package com.doan.WebLiveStreamGame.service;

import com.doan.WebLiveStreamGame.model.BaoCao;
import com.doan.WebLiveStreamGame.model.PhanHoi;

import java.util.List;

public interface BaoCaoService {
    void saveBaoCao(BaoCao baoCao);

    void deleteBaoCao(Long idbc);

    List<BaoCao> getBaoCaoAll();

    List<BaoCao> getBaoCaoByVideoName(String name);

    List<BaoCao> getBaoCaoByUser(String username);

    List<BaoCao> getBaoCaoByTrangThaiBC(int trangThaiBC);

    void updateTrangThaiBaoCao(Long id, int trangThai);

    List<BaoCao> searchBaoCaoByTrangThai(String name, int trangThai);
}
