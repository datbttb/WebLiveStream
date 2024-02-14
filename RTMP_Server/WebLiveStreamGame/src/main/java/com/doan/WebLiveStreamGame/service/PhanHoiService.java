package com.doan.WebLiveStreamGame.service;

import com.doan.WebLiveStreamGame.model.PhanHoi;

import java.util.List;

public interface PhanHoiService {
    void savePhanHoi(PhanHoi phanHoi);

    void deletePhanHoi(Long idph);

    List<PhanHoi> getPhanHoiAll();

    List<PhanHoi> getPhanHoiByVideoName(String name);

    List<PhanHoi> getPhanHoiByUser(String username);

    List<PhanHoi> getPhanHoiByTrangThaiPH(int trangThaiPH);

    void updateTrangThaiPhanHoi(Long id, int trangThai);
}
