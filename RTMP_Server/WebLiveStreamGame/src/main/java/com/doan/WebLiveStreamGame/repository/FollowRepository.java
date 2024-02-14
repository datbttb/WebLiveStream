package com.doan.WebLiveStreamGame.repository;

import com.doan.WebLiveStreamGame.model.Follow;
import com.doan.WebLiveStreamGame.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query("select fol.following_id from Follow fol where fol.follow_id.username = ?1")
    List<User> dangSachDangFollow(String username);

    @Query("select fol.follow_id from Follow fol where fol.following_id.username = ?1")
    List<User> dangSachFollow(String username);

    @Query("select fol from Follow fol where fol.following_id.username = ?1 and fol.follow_id.username = ?2")
    Optional<Follow> getFollowByFollowidAndFollowingid(String flingid, String flid);
}
