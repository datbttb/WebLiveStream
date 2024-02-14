package com.doan.WebLiveStreamGame.repository;

import com.doan.WebLiveStreamGame.model.PhanHoi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhanHoiRepository extends JpaRepository<PhanHoi, Long> {

    @Query("select ph from PhanHoi ph where ph.user_id.username = ?1")
    List<PhanHoi> findPhanHoiByUserName(String username);

    @Query("select ph from PhanHoi ph where ph.video_id.name like %?1% or ph.user_id.username like %?1%")
    List<PhanHoi> findPhanHoiByVideoName(String videoName);

    @Query("select ph from PhanHoi ph where  ph.trangThaiPH = ?1")
    List<PhanHoi> findPhanHoisByTrangThaiPH(int trangThaiPH);

}
