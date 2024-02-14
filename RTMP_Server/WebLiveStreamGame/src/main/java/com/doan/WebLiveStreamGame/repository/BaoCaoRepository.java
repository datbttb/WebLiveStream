package com.doan.WebLiveStreamGame.repository;

import com.doan.WebLiveStreamGame.model.BaoCao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BaoCaoRepository extends JpaRepository<BaoCao, Long> {

    @Query("select bc from BaoCao bc where bc.user_id.username = ?1")
    List<BaoCao> findBaoCaoByUserName(String username);

    @Query("select bc from BaoCao bc where bc.video_id.name like %?1% or bc.user_id.username like %?1%")
    List<BaoCao> findBaoCaoByVideoName(String videoName);

    @Query("select bc from BaoCao bc where (bc.video_id.name like %?1% or bc.user_id.username like %?1%) and bc.trangThaiBC=?2")
    List<BaoCao> findBaoCaoByVideoNameAndTrangThaiBC(String videoName, int trangThai);

    @Query("select bc from BaoCao bc where  bc.trangThaiBC = ?1")
    List<BaoCao> findBaoCaoByTrangThaiBC(int trangThaiPH);

}
