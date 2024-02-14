package com.doan.WebLiveStreamGame.repository;

import com.doan.WebLiveStreamGame.model.StreamKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StreamKeyRepository extends JpaRepository<StreamKey, Long> {
    @Query("SELECT COUNT(*) FROM StreamKey ")
    Long countRecord();

    @Query("select sk from StreamKey sk where sk.user_id.username= ?1")
    Optional<StreamKey> findStreamKeyByUserName(String username);
}
