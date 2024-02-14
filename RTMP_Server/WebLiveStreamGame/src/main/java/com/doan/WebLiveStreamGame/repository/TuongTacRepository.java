package com.doan.WebLiveStreamGame.repository;

import com.doan.WebLiveStreamGame.model.TuongTac;
import com.doan.WebLiveStreamGame.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TuongTacRepository extends JpaRepository<TuongTac, Long> {

    @Query("select tt from TuongTac tt where tt.user_id.username=?1 and  tt.video_id.url=?2")
    Optional<TuongTac> findByUserNameAndUrl(String username, String url);

    @Query("select tt.video_id from TuongTac tt where tt.user_id.username=?1 and tt.trangThai=?2")
    List<Video> getVideoTheoTrangThai(String username, int trangthai);

    @Query("select count(tt) from TuongTac tt where tt.video_id.url = ?1 and tt.trangThai=?2")
    Long soLuotTuongTac(String urlVideo, int trangThai);



}
