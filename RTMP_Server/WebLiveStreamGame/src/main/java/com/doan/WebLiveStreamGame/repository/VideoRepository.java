package com.doan.WebLiveStreamGame.repository;


import com.doan.WebLiveStreamGame.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {

    @Query("select vd from Video vd where vd.key_id.user_id.username = ?1")
    List<Video> findVideoByUsername(String username);

    @Query("select vd from Video vd where vd.name like %?1% or vd.key_id.user_id.username like %?1%")
    List<Video> findVideoByName(String videoName);

    @Query("select vd from Video vd where vd.key_id.user_id.username = ?1 and vd.trangThai =?2")
    List<Video> findVideoByNameAndTrangThai(String username, int trangThai);

    @Query("select vd from Video vd where vd.url = ?1")
    Optional<Video> findVideoByUrl(String url);

    @Query("select vd from Video vd where vd.trangThai=?1")
    List<Video> findVideosByTrangThai(int trangThai);

    @Query("select vd from Video vd where (vd.name like %?1% or vd.key_id.user_id.username like %?1%) and vd.trangThai = ?2")
    List<Video> findVideoByVideoNameAndTrangThai(String videoName, int trangThai);



}
